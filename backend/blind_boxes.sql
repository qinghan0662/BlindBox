DELETE FROM blind_boxes
WHERE id NOT IN (
  SELECT MIN(id)
  FROM blind_boxes
  GROUP BY name
);
('鹿鹿盲盒', '呆萌小鹿造型玩具', 44.9, 'https://img.alicdn.com/imgextra/i3/2215536597487/O1CN01deer.jpg', 40, 'active', 1),
('蟑螂盲盒', '恶搞蟑螂造型玩具', 19.9, 'https://img.alicdn.com/imgextra/i3/2215536597487/O1CN01cockroach.jpg', 10, 'active', 1);
UPDATE blind_boxes SET coverImage = 'https://你的新图片地址.jpg' WHERE id = 9;
