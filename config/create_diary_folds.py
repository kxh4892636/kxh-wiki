# import os

# months = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
#           7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
# year = '2023'

# folds_path = fr"D:\kxh\10_note\1020_diary\1020{year[-2:]}_{year}"
# if not os.path.exists(folds_path):
#     os.mkdir(folds_path)

# for month, days in months.items():
#     file_path = fr"D:\kxh\10_note\1020_diary\1020{year[-2:]}_{year}\{year}{month:02d}.md"
#     if os.path.exists(file_path):
#         break

#     content = f'# {year}\n\n'
#     for day in range(1, days+1):
#         content += f'## {day} 日\n\n### 日程安排\n\n- 规划;\n- anki;\n- 总结;\n\n### 日记\n\n### 其他\n\n'

#     with open(file_path, 'w', encoding='utf-8') as f:
#         f.write(content)
