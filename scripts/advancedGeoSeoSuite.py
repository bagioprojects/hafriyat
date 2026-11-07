#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Adem Hafriyat - İleri Düzey Python GEO, Geo-SEO ve Ağ Otoritesi Analiz Paketi
Kullanılan Kütüphaneler:
- advertools: Sitemap ve robots.txt analizi
- scikit-learn: TF-IDF ve Kosinüs Benzerliği (RAG & AI Arama Optimizasyonu)
- textstat: Okunabilirlik ve AI Overviews Alıntılanabilirlik Skoru
- geopy & shapely: Koordinat doğrulaması, NAP tutarlılığı ve servis poligonu
- networkx: İç link ağı, Internal PageRank ve yetim sayfa tespiti
- rapidfuzz: Başlık ve H1 yamyamlık (cannibalization) taraması
- beautifulsoup4: DOM ve Schema.org JSON-LD yapılandırılmış veri ayrıştırma
"""

import sys
import os
import json
import base64
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup
import pandas as pd
import numpy as np

# İleri düzey analiz kütüphaneleri
import advertools as adv
from geopy.distance import geodesic
from shapely.geometry import Point, Polygon
import networkx as nx
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import rapidfuzz.fuzz as fuzz
import textstat

BASE_URL = "http://localhost:7450"

# Yalova İlçe ve Merkez Koordinatları (WGS84)
DISTRICT_COORDS = {
    "Merkez Garaj (Taşköprü Sanayi)": (40.6865, 29.3789),
    "Çiftlikköy Merkez": (40.6608, 29.3242),
    "Taşköprü Beldesi": (40.6872, 29.3811),
    "Yalova Merkez": (40.6550, 29.2769),
    "Altınova Tersaneler": (40.6978, 29.5089),
    "Çınarcık Sahil": (40.6439, 29.1197),
    "Termal Kaplıcalar": (40.6094, 29.1822),
    "Armutlu": (40.5222, 28.8358)
}

# Google UULE Generator (Yerel Arama Simülatörü)
def generate_uule(location_name: str) -> str:
    """Google &uule= parametresi üretir (Base64 Secret Geolocation Hash)."""
    length = len(location_name)
    secret_key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"[length]
    encoded = base64.b64encode(location_name.encode('utf-8')).decode('utf-8').rstrip('=')
    return f"w+CAIQICI{secret_key}{encoded}"

TARGET_PROMPTS = [
    "yalova kepçe",
    "yalova kiralık kepçe",
    "yalova operatörlü kepçe",
    "taşköprü forklift kiralama",
    "çiftlikköy temel kazısı",
    "altınova tersane ağır tonaj forklift",
    "çınarcık eğimli arazi kepçe kazısı",
    "termal doğa koruyucu hassas kazı",
    "keson su kuyusu açma beton büz",
    "bina temel kazısı iksa şev açısı",
    "tarla tesviyesi lazer nivo eğim"
]

def fetch_url(url: str):
    req = urllib.request.Request(url, headers={'User-Agent': 'AdemHafriyat-GeoAudit/2.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.getcode(), response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return 500, str(e)

def run_suite():
    print("=" * 70)
    print("🚜 ADEM HAFRİYAT - İLERİ DÜZEY GEO & GEO-SEO PYTHON ANALİZ MOTORU")
    print("=" * 70)

    report = {
        "status": "success",
        "modules": {}
    }

    # --------------------------------------------------------------------------
    # 1. MODÜL: SİTEMAP VE URL KEŞFİ (advertools)
    # --------------------------------------------------------------------------
    print("\n[1/5] advertools: /sitemap.xml İndeksi ve Alt Haritalar Taranıyor...")
    sitemap_url = f"{BASE_URL}/sitemap.xml"
    code, sitemap_xml = fetch_url(sitemap_url)
    if code != 200:
        print(f"❌ HATA: /sitemap.xml HTTP {code}")
        sys.exit(1)

    soup = BeautifulSoup(sitemap_xml, 'xml')
    sub_sitemaps = [loc.text.strip() for loc in soup.find_all('loc')]
    print(f"   Bulunan Alt Sitemap Sayısı: {len(sub_sitemaps)}")

    all_urls = []
    for sm in sub_sitemaps:
        local_sm = sm.replace("https://yalovakepcehafriyat.com.tr", BASE_URL)
        c, sm_body = fetch_url(local_sm)
        sm_soup = BeautifulSoup(sm_body, 'xml')
        urls = [u.find('loc').text.strip() for u in sm_soup.find_all('url') if u.find('loc')]
        all_urls.extend(urls)

    unique_urls = list(dict.fromkeys(all_urls))
    print(f"   Taranacak Toplam Benzersiz URL Sayısı: {len(unique_urls)}")
    report["modules"]["sitemap"] = {
        "sub_sitemaps_count": len(sub_sitemaps),
        "total_urls_discovered": len(unique_urls)
    }

    # --------------------------------------------------------------------------
    # 2. MODÜL: GEO-SEO & NAP & UULE ANALİZİ (geopy & shapely)
    # --------------------------------------------------------------------------
    print("\n[2/5] geopy & shapely: Yerel Koordinat, Mesafe ve UULE Analizi...")
    base_garage = DISTRICT_COORDS["Merkez Garaj (Taşköprü Sanayi)"]
    distance_results = {}
    uule_map = {}

    for name, coords in DISTRICT_COORDS.items():
        km = geodesic(base_garage, coords).kilometers
        distance_results[name] = round(km, 2)
        uule_map[name] = generate_uule(f"{name}, Yalova, Turkey")

    # Yalova Hizmet Kapsama Poligonu (Marmara Kıyısı & Güney Sınırı)
    yalova_polygon = Polygon([
        (40.50, 28.80), # Armutlu Batı
        (40.65, 29.10), # Çınarcık
        (40.67, 29.30), # Yalova / Çiftlikköy
        (40.71, 29.55), # Altınova Doğu
        (40.55, 29.40), # Güney dağlık sınır
        (40.50, 28.80)
    ])
    all_coords_inside = all(yalova_polygon.contains(Point(c[0], c[1])) or Point(c[0], c[1]).distance(yalova_polygon) < 0.05 for c in DISTRICT_COORDS.values())

    print(f"   Garaj Merkezli Mesafeler: {distance_results}")
    print(f"   Yalova Kapsama Poligonu Geçerliliği: {'%100 UYUMLU' if all_coords_inside else 'UYARI'}")
    report["modules"]["geo_local"] = {
        "garage_coords": base_garage,
        "distances_km": distance_results,
        "uule_samples": uule_map,
        "coverage_polygon_valid": all_coords_inside
    }

    # --------------------------------------------------------------------------
    # 3. MODÜL: CRAWLER, İÇ LİNK GRAFI & PAGERANK (networkx)
    # --------------------------------------------------------------------------
    print("\n[3/5] networkx & bs4: 243 Sayfa İçi Link Grafı ve Internal PageRank Hesabı...")
    G = nx.DiGraph()
    page_data = []

    for idx, raw_url in enumerate(unique_urls):
        local_url = raw_url.replace("https://yalovakepcehafriyat.com.tr", BASE_URL)
        path = urllib.parse.urlparse(raw_url).path
        G.add_node(path)

        c, html = fetch_url(local_url)
        if c != 200:
            print(f"   ⚠️ Sayfa Hatası: {path} -> HTTP {c}")
            continue

        bs = BeautifulSoup(html, 'html.parser')
        title = bs.find('title').text.strip() if bs.find('title') else ''
        h1 = bs.find('h1').text.strip() if bs.find('h1') else ''
        meta_desc = ''
        m_tag = bs.find('meta', attrs={'name': 'description'})
        if m_tag and m_tag.get('content'):
            meta_desc = m_tag['content'].strip()

        # Linkleri topla
        for a in bs.find_all('a', href=True):
            href = a['href'].strip()
            if href.startswith('/'):
                target_path = href.split('#')[0].split('?')[0]
                if target_path:
                    G.add_edge(path, target_path)

        # Temiz metin
        for s in bs(['script', 'style', 'nav', 'header', 'footer']):
            s.extract()
        text_content = ' '.join(bs.stripped_strings)

        # Okunabilirlik skoru (textstat)
        flesch_reading = textstat.flesch_reading_ease(text_content) if len(text_content) > 100 else 60.0

        page_data.append({
            "path": path,
            "title": title,
            "h1": h1,
            "meta_desc": meta_desc,
            "text": text_content,
            "reading_ease": flesch_reading
        })

    # Internal PageRank Hesabı
    pagerank_scores = nx.pagerank(G, alpha=0.85)
    in_degrees = dict(G.in_degree())
    orphan_pages = [n for n, deg in in_degrees.items() if deg == 0 and n != '/']

    # En yüksek otoriteye sahip ilk 5 sayfa
    top_pr_pages = sorted(pagerank_scores.items(), key=lambda x: x[1], reverse=True)[:7]
    print(f"   Yetim (Orphan - 0 In-degree) Sayfa Sayısı: {len(orphan_pages)}")
    print(f"   Top PageRank Sayfaları:")
    for p, score in top_pr_pages:
        print(f"     - {p}: {score:.4f} (Gelen Link: {in_degrees.get(p, 0)})")

    report["modules"]["network_graph"] = {
        "total_nodes": G.number_of_nodes(),
        "total_edges": G.number_of_edges(),
        "orphan_count": len(orphan_pages),
        "top_pagerank": [{"path": p, "score": round(s, 5), "in_degree": in_degrees.get(p, 0)} for p, s in top_pr_pages]
    }

    # --------------------------------------------------------------------------
    # 4. MODÜL: YENİ NESİL GEO & RAG VEKTÖR BENZERLİĞİ (scikit-learn)
    # --------------------------------------------------------------------------
    print("\n[4/5] scikit-learn & textstat: RAG Semantik Benzerlik & AI Arama Skorları...")
    df_pages = pd.DataFrame(page_data)
    corpus = df_pages['text'].tolist()

    vectorizer = TfidfVectorizer(max_features=10000, stop_words=None, ngram_range=(1, 3))
    tfidf_matrix = vectorizer.fit_transform(corpus)

    prompt_similarities = {}
    for prompt in TARGET_PROMPTS:
        prompt_vec = vectorizer.transform([prompt])
        sims = cosine_similarity(prompt_vec, tfidf_matrix).flatten()
        top_idx = int(np.argmax(sims))
        best_score = float(sims[top_idx])
        best_page = df_pages.iloc[top_idx]['path']
        prompt_similarities[prompt] = {
            "best_match_page": best_page,
            "cosine_similarity": round(best_score, 4),
            "rag_confidence": "Çok Yüksek" if best_score > 0.4 else ("Yüksek" if best_score > 0.25 else "Orta")
        }
        print(f"   🔍 Sorgu: '{prompt}' -> En İyi Eşleşme: {best_page} (Kosinüs: {best_score:.4f} | {prompt_similarities[prompt]['rag_confidence']})")

    report["modules"]["geo_rag_search"] = prompt_similarities

    # --------------------------------------------------------------------------
    # 5. MODÜL: rapidfuzz İLE BAŞLIK YAMYAMLIK (CANNIBALIZATION) KONTROLÜ
    # --------------------------------------------------------------------------
    print("\n[5/5] rapidfuzz: Başlık ve H1 Yamyamlık (Cannibalization) Taraması...")
    titles = df_pages[['path', 'title']].to_dict('records')
    cannibal_warnings = []

    for i in range(len(titles)):
        for j in range(i + 1, len(titles)):
            p1, t1 = titles[i]['path'], titles[i]['title']
            p2, t2 = titles[j]['path'], titles[j]['title']
            if not t1 or not t2:
                continue
            ratio = fuzz.token_sort_ratio(t1, t2)
            if ratio >= 92 and p1 != p2:
                cannibal_warnings.append({
                    "page1": p1,
                    "page2": p2,
                    "title1": t1,
                    "title2": t2,
                    "similarity": ratio
                })

    print(f"   Kritik Yamyamlık / Çakışma Riski (>%92): {len(cannibal_warnings)} adet bulundu.")
    if cannibal_warnings:
        for w in cannibal_warnings[:3]:
            print(f"     ⚠️ {w['page1']} <-> {w['page2']} ({w['similarity']}%)")
    report["modules"]["cannibalization"] = {
        "critical_overlaps_count": len(cannibal_warnings),
        "details": cannibal_warnings
    }

    # --------------------------------------------------------------------------
    # RAPOR ÇIKTISI VE SERTİFİKASYON
    # --------------------------------------------------------------------------
    out_path = os.path.join(os.path.dirname(__file__), "advancedGeoReport.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print("\n" + "=" * 70)
    print("🏆 İLERİ DÜZEY GEO & GEO-SEO ANALİZİ TAMAMLANDI")
    print(f"📁 Detaylı Rapor: {out_path}")
    print("=" * 70)

if __name__ == '__main__':
    run_suite()
