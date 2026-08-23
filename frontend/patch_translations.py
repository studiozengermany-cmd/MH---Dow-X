import json
import os

with open('src/lib/locales/vi_clean.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# The user's requested translations
data['header']['title'] = "MH - DOW X (TRÌNH TẢI MEDIA TWITTER/X HÀNG LOẠT / TWITTER/X MEDIA BATCH DOWNLOADER)"
data['searchBar']['single'] = "Đơn / Single"
data['searchBar']['multiple'] = "Nhiều / Multiple"
data['searchBar']['public'] = "Công khai / Public"
data['searchBar']['private'] = "Riêng tư / Private"
data['searchBar']['inputLabel'] = "Liên kết hoặc Tên người dùng X/Twitter / X/Twitter URL or Username"
data['searchBar']['urlOrUsername'] = "Liên kết hoặc Tên người dùng X/Twitter / X/Twitter URL or Username"
data['searchBar']['fetchButton'] = "Lấy dữ liệu / Fetch"
data['searchBar']['fetch'] = "Lấy dữ liệu / Fetch"
data['searchBar']['placeholder'] = "masteraoko hoặc @masteraoko hoặc https://x.com/masteraoko"
data['searchBar']['placeholderLikes'] = "masteraoko hoặc @masteraoko hoặc https://x.com/masteraoko"
data['searchBar']['inputPlaceholder'] = "masteraoko hoặc @masteraoko hoặc https://x.com/masteraoko"

# The missing View Media section!
data['searchBar']['viewMedia'] = "Xem Media / View Media"
data['searchBar']['viewMediaDesc'] = "Kiểm tra dòng thời gian media và thông tin tài khoản. / Check out the media timeline and accounts information."
data['searchBar']['openSavedAccounts'] = "Mở Danh sách đã lưu để Tải xuống / Open Saved Accounts to Download"
data['searchBar']['accountList'] = "Danh sách tài khoản / Account List"
data['searchBar']['accountListHelp'] = "Nhập mỗi tài khoản một dòng / Enter one account per line"

# Save properly
with open('src/lib/locales/vi.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
with open('src/lib/locales/en.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)
print("Done writing translations!")
