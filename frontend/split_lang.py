import json

def process_value(k, v, lang):
    if not isinstance(v, str):
        return v
        
    if k == 'title' and 'TWITTER/X MEDIA BATCH DOWNLOADER' in v:
        if lang == 'vi':
            return 'MH - DOW X (TRÌNH TẢI MEDIA TWITTER/X HÀNG LOẠT)'
        else:
            return 'MH - DOW X (TWITTER/X MEDIA BATCH DOWNLOADER)'
            
    if ' / ' in v:
        parts = v.split(' / ', 1)
        if lang == 'vi':
            return parts[0].strip()
        else:
            return parts[1].strip()
    return v

def process_dict(d, lang):
    new_d = {}
    for k, v in d.items():
        if isinstance(v, dict):
            new_d[k] = process_dict(v, lang)
        else:
            new_d[k] = process_value(k, v, lang)
    return new_d

with open('src/lib/locales/vi_clean.json', 'r', encoding='utf-8') as f:
    base_data = json.load(f)
    
# From my previous modifications, I used vi.json which was correctly formatted.
# Wait, let's read from the current vi.json to make sure we have the latest.
with open('src/lib/locales/vi.json', 'r', encoding='utf-8') as f:
    base_data = json.load(f)

vi_data = process_dict(base_data, 'vi')
en_data = process_dict(base_data, 'en')

with open('src/lib/locales/vi.json', 'w', encoding='utf-8') as f:
    json.dump(vi_data, f, indent=2, ensure_ascii=False)
    
with open('src/lib/locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(en_data, f, indent=2, ensure_ascii=False)

print("Split completed successfully!")
