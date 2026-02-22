-- Trivia Questions and Options Data

-- Category: Sanat
SET @cat_id = (SELECT id FROM categories WHERE name = 'Sanat');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Mona Lisa tablosunu hangi sanatçı yapmıştır?', 'Mona Lisa, Leonardo da Vinci tarafından 1503-1519 yılları arasında yapılmıştır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Leonardo da Vinci', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Michelangelo', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Raphael', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Donatello', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi müze Paris''te bulunur?', 'Louvre Müzesi, Paris''in merkezinde yer alan dünyanın en büyük sanat müzesidir.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Louvre', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'British Museum', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Prado', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Uffizi', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Vincent van Gogh hangi ülkedendir?', 'Van Gogh 1853''te Hollanda''da doğmuştur.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hollanda', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Fransa', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Belçika', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Almanya', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Kübizm akımının kurucuları kimlerdir?', 'Pablo Picasso ve Georges Braque, 20. yüzyılın başında Kübizm akımını başlatmıştır.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Picasso ve Braque', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Monet ve Renoir', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Dali ve Miro', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Klimt ve Schiele', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, '"Çığlık" tablosu hangi sanatçıya aittir?', 'Çığlık (The Scream), Norveçli ressam Edvard Munch''un 1893 tarihli ünlü eseridir.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Edvard Munch', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Van Gogh', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Picasso', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Matisse', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Empresyonizm akımı hangi yüzyılda ortaya çıkmıştır?', 'Empresyonizm, 1860''larda Paris''te ortaya çıkmıştır.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '19. yüzyıl', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '18. yüzyıl', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '20. yüzyıl', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '17. yüzyıl', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Michelangelo''nun Sistine Şapeli''ndeki tavan freskleri hangi yıl tamamlanmıştır?', 'Michelangelo, Sistine Şapeli''nin tavanını 1508-1512 yılları arasında boyadı.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1512', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1498', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1527', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1545', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Andy Warhol''un ünlü "Campbell''s Soup Cans" eseri kaç tane kutudan oluşur?', 'Eser, 32 farklı çeşit Campbell''s çorbası kutusunu gösterir.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '32', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '50', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '24', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '100', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Barok dönemin en önemli ressamlarından Caravaggio''nun asıl adı nedir?', 'Caravaggio, sanatçının doğduğu şehrin adıdır; asıl adı Michelangelo Merisi da Caravaggio''dur.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Michelangelo Merisi', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Giovanni Bellini', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Sandro Botticelli', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Raffaello Sanzio', FALSE);

-- Category: Coğrafya
SET @cat_id = (SELECT id FROM categories WHERE name = 'Coğrafya');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Dünyanın en büyük okyanusu hangisidir?', 'Pasifik Okyanusu, dünya yüzeyinin yaklaşık %46''sını kaplar.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Pasifik Okyanusu', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Atlas Okyanusu', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hint Okyanusu', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Arktik Okyanusu', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Mısır hangi kıtadadır?', 'Mısır, Afrika kıtasının kuzey doğusunda yer alır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Afrika', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Asya', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Avrupa', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Orta Doğu', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Türkiye''nin başkenti neresidir?', 'Ankara, 1923 yılında Türkiye Cumhuriyeti''nin başkenti olmuştur.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Ankara', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'İstanbul', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'İzmir', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Bursa', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Nil Nehri kaç ülkeden geçer?', 'Nil Nehri, 11 farklı Afrika ülkesinden geçer.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '11', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '7', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '13', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Everest Dağı hangi iki ülke arasındadır?', 'Everest, Nepal ve Çin (Tibet) arasındaki sınırda bulunur.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Nepal ve Çin', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hindistan ve Çin', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Nepal ve Hindistan', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Bhutan ve Çin', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi ülkenin dünyada en fazla adası vardır?', 'İsveç, yaklaşık 267.570 adayla dünya rekoruna sahiptir.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'İsveç', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Endonezya', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Filipinler', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Norveç', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Dünyanın en derin okyanus çukuru hangisidir?', 'Mariana Çukuru, yaklaşık 11.034 metre derinliğe sahiptir.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Mariana Çukuru', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Tonga Çukuru', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Filipin Çukuru', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Kermadec Çukuru', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi ülke hem Avrupa hem de Asya kıtasında yer almaz?', 'Ermenistan tamamen Asya''da, Türkiye, Rusya ve Azerbaycan ise hem Avrupa hem Asya''dadır.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Ermenistan', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Türkiye', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Rusya', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Azerbaycan', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Lesotho ülkesi hangi ülke tarafından tamamen çevrilmiştir?', 'Lesotho, dünyadaki üç enklaveden (tamamen başka bir ülke içinde kalan ülke) biridir.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Güney Afrika', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Zimbabve', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Botsvana', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Namibya', FALSE);

-- Category: Genel Kültür
SET @cat_id = (SELECT id FROM categories WHERE name = 'Genel Kültür');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir yılda kaç gün vardır?', 'Normal yıllarda 365, artık yıllarda 366 gün vardır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '365', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '360', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '366', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '364', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi gezegen "Kırmızı Gezegen" olarak bilinir?', 'Mars, yüzeyindeki demir oksit nedeniyle kırmızı görünür.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Mars', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Venüs', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Jüpiter', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Satürn', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Pizza hangi ülkenin yemeğidir?', 'Modern pizza, Napoli, İtalya''da ortaya çıkmıştır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'İtalya', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Fransa', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Yunanistan', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'İspanya', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Nobel Ödülleri ilk kez hangi yıl verilmiştir?', 'İlk Nobel Ödülleri, Alfred Nobel''in vasiyetine göre 1901''de verildi.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1901', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1895', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1910', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1889', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangisi BM Güvenlik Konseyi''nin daimi üyesi değildir?', 'Daimi üyeler: ABD, Rusya, Çin, İngiltere ve Fransa''dır.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Almanya', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Çin', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Rusya', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Fransa', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Olimpiyat Oyunları kaç yılda bir düzenlenir?', 'Hem Yaz hem de Kış Olimpiyatları 4 yılda bir düzenlenir.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '4', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '5', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '3', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Enigma şifre makinesini kim kırmıştır?', 'Alan Turing ve ekibi, II. Dünya Savaşı sırasında Nazi Enigma kodunu kırdı.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Alan Turing', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'John von Neumann', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Claude Shannon', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Konrad Zuse', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangisi UNESCO Dünya Mirası Listesi''nde yer almaz?', 'Eyfel Kulesi, Paris kıyıları ile birlikte değil, tek başına UNESCO listesinde değildir.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Eyfel Kulesi', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Machu Picchu', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Taj Mahal', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Çin Seddi', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'İlk yapay uydu Sputnik 1 hangi yıl fırlatılmıştır?', 'Sovyetler Birliği, 4 Ekim 1957''de Sputnik 1''i fırlattı.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1957', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1961', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1953', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1969', FALSE);

-- Category: Tarih
SET @cat_id = (SELECT id FROM categories WHERE name = 'Tarih');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'I. Dünya Savaşı hangi yıl başlamıştır?', 'I. Dünya Savaşı 1914-1918 yılları arasında gerçekleşmiştir.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1914', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1918', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1939', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1945', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Türkiye Cumhuriyeti hangi yıl kurulmuştur?', 'Türkiye Cumhuriyeti 29 Ekim 1923''te ilan edilmiştir.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1923', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1919', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1922', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1920', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Kristof Kolomb Amerika''yı hangi yıl keşfetmiştir?', 'Kolomb, 12 Ekim 1492''de Amerika kıtasına ulaştı.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1492', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1498', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1500', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1485', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bizans İmparatorluğu hangi yıl sona ermiştir?', '29 Mayıs 1453''te İstanbul''un fethi ile Bizans sona erdi.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1453', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1461', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1444', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1440', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangisi Rönesans''ın doğduğu şehirdir?', 'Rönesans hareketi 14. yüzyılda Floransa''da başladı.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Floransa', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Roma', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Venedik', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Milano', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Fransız Devrimi hangi yıl başlamıştır?', 'Fransız Devrimi 1789 yılında Bastille''in ele geçirilmesiyle başladı.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1789', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1776', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1804', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1799', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Magna Carta hangi yıl imzalanmıştır?', 'Magna Carta, 15 Haziran 1215''te Kral John tarafından imzalandı.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1215', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1066', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1340', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1295', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Peloponez Savaşları hangi iki şehir devleti arasında gerçekleşmiştir?', 'Peloponez Savaşları (MÖ 431-404), Atina ve Sparta arasında gerçekleşti.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Atina ve Sparta', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Atina ve Teb', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Sparta ve Korint', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Makedonya ve Atina', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Avusturya-Macaristan İmparatorluğu''nun son imparatoru kimdir?', 'I. Karl, 1916-1918 arasında hüküm süren son Avusturya-Macaristan İmparatoru''dur.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'I. Karl', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'I. Franz Joseph', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'II. Ferdinand', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'III. Leopold', FALSE);

-- Category: Bilim
SET @cat_id = (SELECT id FROM categories WHERE name = 'Bilim');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Su hangi elementlerden oluşur?', 'Su (H₂O), 2 hidrojen ve 1 oksijen atomundan oluşur.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hidrojen ve Oksijen', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hidrojen ve Karbon', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Oksijen ve Karbon', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hidrojen ve Azot', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'İnsan vücudundaki en büyük organ hangisidir?', 'Deri, yaklaşık 2 m² alan kaplayan en büyük organdır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Deri', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Karaciğer', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Akciğer', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Kalp', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Işık hızı saniyede yaklaşık ne kadardır?', 'Işık hızı saniyede yaklaşık 299.792 km''dir.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '300.000 km', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '150.000 km', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '500.000 km', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '1.000.000 km', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'DNA''nın çift sarmal yapısını kim keşfetmiştir?', 'James Watson ve Francis Crick, 1953''te DNA''nın yapısını keşfetti.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Watson ve Crick', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Darwin ve Wallace', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Mendel ve Morgan', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Pasteur ve Koch', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Periyodik tabloda kaç element vardır?', '2024 itibariyle 118 onaylanmış element bulunmaktadır.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '118', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '92', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '103', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '109', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Fotosentez hangi organelde gerçekleşir?', 'Kloroplastlar, bitki hücrelerinde fotosentez yapan organellerdir.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Kloroplast', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Mitokondri', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Ribozom', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Golgi Cisimciği', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Schrödinger denklemi hangi alanla ilgilidir?', 'Schrödinger denklemi, kuantum sistemlerinin dalga fonksiyonunu açıklar.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Kuantum Mekaniği', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Genel Görelilik', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Termodinamik', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Elektromanyetizma', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'CRISPR-Cas9 teknolojisi ne için kullanılır?', 'CRISPR-Cas9, genetik materyali kesin olarak düzenlemek için kullanılan bir teknolojidir.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Gen düzenleme', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Protein sentezi', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hücre bölünmesi', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'DNA replikasyonu', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Higgs bozonu hangi yıl keşfedilmiştir?', 'Higgs bozonu, CERN''deki LHC''de 2012 yılında keşfedildi.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2012', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2008', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2015', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2010', FALSE);

-- Category: Spor
SET @cat_id = (SELECT id FROM categories WHERE name = 'Spor');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir futbol takımında kaç oyuncu sahada olur?', 'Futbolda her takım 11 oyuncuyla sahada yer alır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '11', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '10', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '12', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'NBA hangi sporun ligidirr?', 'NBA (National Basketball Association), Amerikan profesyonel basketbol ligidirr.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Basketbol', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Beyzbol', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Amerikan Futbolu', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Hokey', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Wimbledon hangi spor dalında düzenlenir?', 'Wimbledon, dünyanın en eski ve prestijli tenis turnuvasıdır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Tenis', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Golf', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Kriket', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Ragbi', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi ülke en çok FIFA Dünya Kupası kazanmıştır?', 'Brezilya, 5 kez (1958, 1962, 1970, 1994, 2002) şampiyon olmuştur.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Brezilya', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Almanya', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'İtalya', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Arjantin', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Usain Bolt''un 100 metre dünya rekoru kaç saniyedir?', 'Usain Bolt, 2009''da Berlin''de 9.58 saniyelik rekor kırdı.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9.58', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9.69', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9.72', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9.63', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Formula 1''de en çok şampiyonluk kazanan pilot kimdir?', 'Hamilton ve Schumacher''in her birinin 7 şampiyonluğu vardır.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Lewis Hamilton / Michael Schumacher', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Ayrton Senna', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Sebastian Vettel', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Alain Prost', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'İlk modern Olimpiyat Oyunları hangi şehirde düzenlenmiştir?', '1896 yılında Atina''da düzenlenen ilk modern Olimpiyatlara 14 ülke katıldı.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Atina', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Paris', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Londra', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'St. Louis', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi tenisçi en çok Grand Slam tekler şampiyonluğu kazanmıştır?', 'Djokovic, 24 Grand Slam şampiyonluğu ile rekor sahibidir (2024 itibariyle).', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Novak Djokovic', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Roger Federer', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Rafael Nadal', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Pete Sampras', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Basketbolda "triple-double" ne demektir?', 'Sayı, ribaund ve asist gibi üç kategoride 10+ istatistik yapmaktır.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Üç istatistikte çift haneli sayı', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Üç sayılık atış', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Üç çeyrek oynamak', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, 'Üçlü takla', FALSE);

-- Category: Mantık
SET @cat_id = (SELECT id FROM categories WHERE name = 'Mantık');

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir saat 3:15''i gösteriyorsa, akrep ile yelkovan arasındaki açı kaç derecedir?', 'Saat 3:15''te, akrep ile yelkovan arası 7.5 derecedir.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '7.5', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '15', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '0', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '30', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, '5 elmanın 3''ünü verirseniz, kaç elmanız kalır?', '5 - 3 = 2 elma kalır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '3', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '5', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '8', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi sayı dizide fazladan: 2, 4, 6, 7, 8, 10?', 'Dizi çift sayılardan oluşuyor, 7 tek sayıdır.', 'easy');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '7', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '8', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '10', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '2', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir odada 4 köşe var. Her köşede bir kedi, her kedinin önünde 3 kedi var. Toplam kaç kedi vardır?', 'Kediler dört köşededir ve birbirlerinin önündedir, toplam 4 kedi.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '4', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '12', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '16', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '7', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir pastayı 8 eşit parçaya ayırmak için minimum kaç kesim yapmalısınız?', 'Üç kesim (çapraz iki kesim + bir yatay kesim) ile 8 parça elde edilir.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '3', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '4', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '7', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '8', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Hangi sayı gelmelidir: 2, 6, 12, 20, 30, ?', 'Fark dizisi: 4, 6, 8, 10, 12... Sonraki: 30 + 12 = 42.', 'medium');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '42', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '40', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '36', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '38', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir tren 1 km uzunluğunda bir tünelden geçiyor. Tren 100 km/s hızla gidiyor ve 1 km uzunluğunda. Tamamen geçmesi kaç saniye sürer?', 'Toplam mesafe 2 km (tünel + tren). 100 km/s = 27.78 m/s, 2000m / 27.78 ≈ 72 saniye.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '72', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '36', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '60', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '48', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Üç anahtarınız var, üç kilitli kapı var. Her anahtar bir kapıyı açıyor ama hangisini bilmiyorsunuz. Tüm kapıları açmak için minimum kaç deneme yapmalısınız?', 'En kötü senaryoda: 1. kapıda 2, 2. kapıda 2 deneme = toplam 4.', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '4', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '3', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '6', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '9', FALSE);

INSERT INTO questions (category_id, question_text, explanation, difficulty) 
VALUES (@cat_id, 'Bir top 100 metre yükseklikten düşüyor. Her zıplamada yüksekliğin yarısına çıkıyor. Kaç zıplamadan sonra 1 metrenin altına düşer?', '100→50→25→12.5→6.25→3.125→1.56→0.78 (7 zıplama sonrası)', 'hard');
SET @q_id = LAST_INSERT_ID();
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '7', TRUE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '6', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '8', FALSE);
INSERT INTO options (question_id, option_text, is_correct) VALUES (@q_id, '5', FALSE);

