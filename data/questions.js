// Questions Database
// Format: { category: { difficulty: [questions] } }

const questions = {
  'Sanat': {
    easy: [
      {
        id: 'art_e_1',
        question: 'Mona Lisa tablosunu hangi sanatçı yapmıştır?',
        options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
        correctAnswer: 'Leonardo da Vinci',
        explanation: 'Mona Lisa, Leonardo da Vinci tarafından 1503-1519 yılları arasında yapılmıştır.'
      },
      {
        id: 'art_e_2',
        question: 'Hangi müze Paris\'te bulunur?',
        options: ['Louvre', 'British Museum', 'Prado', 'Uffizi'],
        correctAnswer: 'Louvre',
        explanation: 'Louvre Müzesi, Paris\'in merkezinde yer alan dünyanın en büyük sanat müzesidir.'
      },
      {
        id: 'art_e_3',
        question: 'Vincent van Gogh hangi ülkedendir?',
        options: ['Hollanda', 'Fransa', 'Belçika', 'Almanya'],
        correctAnswer: 'Hollanda',
        explanation: 'Van Gogh 1853\'te Hollanda\'da doğmuştur.'
      }
    ],
    medium: [
      {
        id: 'art_m_1',
        question: 'Kübizm akımının kurucuları kimlerdir?',
        options: ['Picasso ve Braque', 'Monet ve Renoir', 'Dali ve Miro', 'Klimt ve Schiele'],
        correctAnswer: 'Picasso ve Braque',
        explanation: 'Pablo Picasso ve Georges Braque, 20. yüzyılın başında Kübizm akımını başlatmıştır.'
      },
      {
        id: 'art_m_2',
        question: '"Çığlık" tablosu hangi sanatçıya aittir?',
        options: ['Edvard Munch', 'Van Gogh', 'Picasso', 'Matisse'],
        correctAnswer: 'Edvard Munch',
        explanation: 'Çığlık (The Scream), Norveçli ressam Edvard Munch\'un 1893 tarihli ünlü eseridir.'
      },
      {
        id: 'art_m_3',
        question: 'Empresyonizm akımı hangi yüzyılda ortaya çıkmıştır?',
        options: ['19. yüzyıl', '18. yüzyıl', '20. yüzyıl', '17. yüzyıl'],
        correctAnswer: '19. yüzyıl',
        explanation: 'Empresyonizm, 1860\'larda Paris\'te ortaya çıkmıştır.'
      }
    ],
    hard: [
      {
        id: 'art_h_1',
        question: 'Michelangelo\'nun Sistine Şapeli\'ndeki tavan freskleri hangi yıl tamamlanmıştır?',
        options: ['1512', '1498', '1527', '1545'],
        correctAnswer: '1512',
        explanation: 'Michelangelo, Sistine Şapeli\'nin tavanını 1508-1512 yılları arasında boyadı.'
      },
      {
        id: 'art_h_2',
        question: 'Andy Warhol\'un ünlü "Campbell\'s Soup Cans" eseri kaç tane kutudan oluşur?',
        options: ['32', '50', '24', '100'],
        correctAnswer: '32',
        explanation: 'Eser, 32 farklı çeşit Campbell\'s çorbası kutusunu gösterir.'
      },
      {
        id: 'art_h_3',
        question: 'Barok dönemin en önemli ressamlarından Caravaggio\'nun asıl adı nedir?',
        options: ['Michelangelo Merisi', 'Giovanni Bellini', 'Sandro Botticelli', 'Raffaello Sanzio'],
        correctAnswer: 'Michelangelo Merisi',
        explanation: 'Caravaggio, sanatçının doğduğu şehrin adıdır; asıl adı Michelangelo Merisi da Caravaggio\'dur.'
      }
    ]
  },
  
  'Coğrafya': {
    easy: [
      {
        id: 'geo_e_1',
        question: 'Dünyanın en büyük okyanusu hangisidir?',
        options: ['Pasifik Okyanusu', 'Atlas Okyanusu', 'Hint Okyanusu', 'Arktik Okyanusu'],
        correctAnswer: 'Pasifik Okyanusu',
        explanation: 'Pasifik Okyanusu, dünya yüzeyinin yaklaşık %46\'sını kaplar.'
      },
      {
        id: 'geo_e_2',
        question: 'Mısır hangi kıtadadır?',
        options: ['Afrika', 'Asya', 'Avrupa', 'Orta Doğu'],
        correctAnswer: 'Afrika',
        explanation: 'Mısır, Afrika kıtasının kuzey doğusunda yer alır.'
      },
      {
        id: 'geo_e_3',
        question: 'Türkiye\'nin başkenti neresidir?',
        options: ['Ankara', 'İstanbul', 'İzmir', 'Bursa'],
        correctAnswer: 'Ankara',
        explanation: 'Ankara, 1923 yılında Türkiye Cumhuriyeti\'nin başkenti olmuştur.'
      }
    ],
    medium: [
      {
        id: 'geo_m_1',
        question: 'Nil Nehri kaç ülkeden geçer?',
        options: ['11', '7', '9', '13'],
        correctAnswer: '11',
        explanation: 'Nil Nehri, 11 farklı Afrika ülkesinden geçer.'
      },
      {
        id: 'geo_m_2',
        question: 'Everest Dağı hangi iki ülke arasındadır?',
        options: ['Nepal ve Çin', 'Hindistan ve Çin', 'Nepal ve Hindistan', 'Bhutan ve Çin'],
        correctAnswer: 'Nepal ve Çin',
        explanation: 'Everest, Nepal ve Çin (Tibet) arasındaki sınırda bulunur.'
      },
      {
        id: 'geo_m_3',
        question: 'Hangi ülkenin dünyada en fazla adası vardır?',
        options: ['İsveç', 'Endonezya', 'Filipinler', 'Norveç'],
        correctAnswer: 'İsveç',
        explanation: 'İsveç, yaklaşık 267.570 adayla dünya rekoruna sahiptir.'
      }
    ],
    hard: [
      {
        id: 'geo_h_1',
        question: 'Dünyanın en derin okyanus çukuru hangisidir?',
        options: ['Mariana Çukuru', 'Tonga Çukuru', 'Filipin Çukuru', 'Kermadec Çukuru'],
        correctAnswer: 'Mariana Çukuru',
        explanation: 'Mariana Çukuru, yaklaşık 11.034 metre derinliğe sahiptir.'
      },
      {
        id: 'geo_h_2',
        question: 'Hangi ülke hem Avrupa hem de Asya kıtasında yer almaz?',
        options: ['Ermenistan', 'Türkiye', 'Rusya', 'Azerbaycan'],
        correctAnswer: 'Ermenistan',
        explanation: 'Ermenistan tamamen Asya\'da, Türkiye, Rusya ve Azerbaycan ise hem Avrupa hem Asya\'dadır.'
      },
      {
        id: 'geo_h_3',
        question: 'Lesotho ülkesi hangi ülke tarafından tamamen çevrilmiştir?',
        options: ['Güney Afrika', 'Zimbabve', 'Botsvana', 'Namibya'],
        correctAnswer: 'Güney Afrika',
        explanation: 'Lesotho, dünyadaki üç enklaveden (tamamen başka bir ülke içinde kalan ülke) biridir.'
      }
    ]
  },
  
  'Genel Kültür': {
    easy: [
      {
        id: 'gk_e_1',
        question: 'Bir yılda kaç gün vardır?',
        options: ['365', '360', '366', '364'],
        correctAnswer: '365',
        explanation: 'Normal yıllarda 365, artık yıllarda 366 gün vardır.'
      },
      {
        id: 'gk_e_2',
        question: 'Hangi gezegen "Kırmızı Gezegen" olarak bilinir?',
        options: ['Mars', 'Venüs', 'Jüpiter', 'Satürn'],
        correctAnswer: 'Mars',
        explanation: 'Mars, yüzeyindeki demir oksit nedeniyle kırmızı görünür.'
      },
      {
        id: 'gk_e_3',
        question: 'Pizza hangi ülkenin yemeğidir?',
        options: ['İtalya', 'Fransa', 'Yunanistan', 'İspanya'],
        correctAnswer: 'İtalya',
        explanation: 'Modern pizza, Napoli, İtalya\'da ortaya çıkmıştır.'
      }
    ],
    medium: [
      {
        id: 'gk_m_1',
        question: 'Nobel Ödülleri ilk kez hangi yıl verilmiştir?',
        options: ['1901', '1895', '1910', '1889'],
        correctAnswer: '1901',
        explanation: 'İlk Nobel Ödülleri, Alfred Nobel\'in vasiyetine göre 1901\'de verildi.'
      },
      {
        id: 'gk_m_2',
        question: 'Hangisi BM Güvenlik Konseyi\'nin daimi üyesi değildir?',
        options: ['Almanya', 'Çin', 'Rusya', 'Fransa'],
        correctAnswer: 'Almanya',
        explanation: 'Daimi üyeler: ABD, Rusya, Çin, İngiltere ve Fransa\'dır.'
      },
      {
        id: 'gk_m_3',
        question: 'Olimpiyat Oyunları kaç yılda bir düzenlenir?',
        options: ['4', '2', '5', '3'],
        correctAnswer: '4',
        explanation: 'Hem Yaz hem de Kış Olimpiyatları 4 yılda bir düzenlenir.'
      }
    ],
    hard: [
      {
        id: 'gk_h_1',
        question: 'Enigma şifre makinesini kim kırmıştır?',
        options: ['Alan Turing', 'John von Neumann', 'Claude Shannon', 'Konrad Zuse'],
        correctAnswer: 'Alan Turing',
        explanation: 'Alan Turing ve ekibi, II. Dünya Savaşı sırasında Nazi Enigma kodunu kırdı.'
      },
      {
        id: 'gk_h_2',
        question: 'Hangisi UNESCO Dünya Mirası Listesi\'nde yer almaz?',
        options: ['Eyfel Kulesi', 'Machu Picchu', 'Taj Mahal', 'Çin Seddi'],
        correctAnswer: 'Eyfel Kulesi',
        explanation: 'Eyfel Kulesi, Paris kıyıları ile birlikte değil, tek başına UNESCO listesinde değildir.'
      },
      {
        id: 'gk_h_3',
        question: 'İlk yapay uydu Sputnik 1 hangi yıl fırlatılmıştır?',
        options: ['1957', '1961', '1953', '1969'],
        correctAnswer: '1957',
        explanation: 'Sovyetler Birliği, 4 Ekim 1957\'de Sputnik 1\'i fırlattı.'
      }
    ]
  },
  
  'Tarih': {
    easy: [
      {
        id: 'his_e_1',
        question: 'I. Dünya Savaşı hangi yıl başlamıştır?',
        options: ['1914', '1918', '1939', '1945'],
        correctAnswer: '1914',
        explanation: 'I. Dünya Savaşı 1914-1918 yılları arasında gerçekleşmiştir.'
      },
      {
        id: 'his_e_2',
        question: 'Türkiye Cumhuriyeti hangi yıl kurulmuştur?',
        options: ['1923', '1919', '1922', '1920'],
        correctAnswer: '1923',
        explanation: 'Türkiye Cumhuriyeti 29 Ekim 1923\'te ilan edilmiştir.'
      },
      {
        id: 'his_e_3',
        question: 'Kristof Kolomb Amerika\'yı hangi yıl keşfetmiştir?',
        options: ['1492', '1498', '1500', '1485'],
        correctAnswer: '1492',
        explanation: 'Kolomb, 12 Ekim 1492\'de Amerika kıtasına ulaştı.'
      }
    ],
    medium: [
      {
        id: 'his_m_1',
        question: 'Bizans İmparatorluğu hangi yıl sona ermiştir?',
        options: ['1453', '1461', '1444', '1440'],
        correctAnswer: '1453',
        explanation: '29 Mayıs 1453\'te İstanbul\'un fethi ile Bizans sona erdi.'
      },
      {
        id: 'his_m_2',
        question: 'Hangisi Rönesans\'ın doğduğu şehirdir?',
        options: ['Floransa', 'Roma', 'Venedik', 'Milano'],
        correctAnswer: 'Floransa',
        explanation: 'Rönesans hareketi 14. yüzyılda Floransa\'da başladı.'
      },
      {
        id: 'his_m_3',
        question: 'Fransız Devrimi hangi yıl başlamıştır?',
        options: ['1789', '1776', '1804', '1799'],
        correctAnswer: '1789',
        explanation: 'Fransız Devrimi 1789 yılında Bastille\'in ele geçirilmesiyle başladı.'
      }
    ],
    hard: [
      {
        id: 'his_h_1',
        question: 'Magna Carta hangi yıl imzalanmıştır?',
        options: ['1215', '1066', '1340', '1295'],
        correctAnswer: '1215',
        explanation: 'Magna Carta, 15 Haziran 1215\'te Kral John tarafından imzalandı.'
      },
      {
        id: 'his_h_2',
        question: 'Peloponez Savaşları hangi iki şehir devleti arasında gerçekleşmiştir?',
        options: ['Atina ve Sparta', 'Atina ve Teb', 'Sparta ve Korint', 'Makedonya ve Atina'],
        correctAnswer: 'Atina ve Sparta',
        explanation: 'Peloponez Savaşları (MÖ 431-404), Atina ve Sparta arasında gerçekleşti.'
      },
      {
        id: 'his_h_3',
        question: 'Avusturya-Macaristan İmparatorluğu\'nun son imparatoru kimdir?',
        options: ['I. Karl', 'I. Franz Joseph', 'II. Ferdinand', 'III. Leopold'],
        correctAnswer: 'I. Karl',
        explanation: 'I. Karl, 1916-1918 arasında hüküm süren son Avusturya-Macaristan İmparatoru\'dur.'
      }
    ]
  },
  
  'Bilim': {
    easy: [
      {
        id: 'sci_e_1',
        question: 'Su hangi elementlerden oluşur?',
        options: ['Hidrojen ve Oksijen', 'Hidrojen ve Karbon', 'Oksijen ve Karbon', 'Hidrojen ve Azot'],
        correctAnswer: 'Hidrojen ve Oksijen',
        explanation: 'Su (H₂O), 2 hidrojen ve 1 oksijen atomundan oluşur.'
      },
      {
        id: 'sci_e_2',
        question: 'İnsan vücudundaki en büyük organ hangisidir?',
        options: ['Deri', 'Karaciğer', 'Akciğer', 'Kalp'],
        correctAnswer: 'Deri',
        explanation: 'Deri, yaklaşık 2 m² alan kaplayan en büyük organdır.'
      },
      {
        id: 'sci_e_3',
        question: 'Işık hızı saniyede yaklaşık ne kadardır?',
        options: ['300.000 km', '150.000 km', '500.000 km', '1.000.000 km'],
        correctAnswer: '300.000 km',
        explanation: 'Işık hızı saniyede yaklaşık 299.792 km\'dir.'
      }
    ],
    medium: [
      {
        id: 'sci_m_1',
        question: 'DNA\'nın çift sarmal yapısını kim keşfetmiştir?',
        options: ['Watson ve Crick', 'Darwin ve Wallace', 'Mendel ve Morgan', 'Pasteur ve Koch'],
        correctAnswer: 'Watson ve Crick',
        explanation: 'James Watson ve Francis Crick, 1953\'te DNA\'nın yapısını keşfetti.'
      },
      {
        id: 'sci_m_2',
        question: 'Periyodik tabloda kaç element vardır?',
        options: ['118', '92', '103', '109'],
        correctAnswer: '118',
        explanation: '2024 itibariyle 118 onaylanmış element bulunmaktadır.'
      },
      {
        id: 'sci_m_3',
        question: 'Fotosentez hangi organelde gerçekleşir?',
        options: ['Kloroplast', 'Mitokondri', 'Ribozom', 'Golgi Cisimciği'],
        correctAnswer: 'Kloroplast',
        explanation: 'Kloroplastlar, bitki hücrelerinde fotosentez yapan organellerdir.'
      }
    ],
    hard: [
      {
        id: 'sci_h_1',
        question: 'Schrödinger denklemi hangi alanla ilgilidir?',
        options: ['Kuantum Mekaniği', 'Genel Görelilik', 'Termodinamik', 'Elektromanyetizma'],
        correctAnswer: 'Kuantum Mekaniği',
        explanation: 'Schrödinger denklemi, kuantum sistemlerinin dalga fonksiyonunu açıklar.'
      },
      {
        id: 'sci_h_2',
        question: 'CRISPR-Cas9 teknolojisi ne için kullanılır?',
        options: ['Gen düzenleme', 'Protein sentezi', 'Hücre bölünmesi', 'DNA replikasyonu'],
        correctAnswer: 'Gen düzenleme',
        explanation: 'CRISPR-Cas9, genetik materyali kesin olarak düzenlemek için kullanılan bir teknolojidir.'
      },
      {
        id: 'sci_h_3',
        question: 'Higgs bozonu hangi yıl keşfedilmiştir?',
        options: ['2012', '2008', '2015', '2010'],
        correctAnswer: '2012',
        explanation: 'Higgs bozonu, CERN\'deki LHC\'de 2012 yılında keşfedildi.'
      }
    ]
  },
  
  'Spor': {
    easy: [
      {
        id: 'spo_e_1',
        question: 'Bir futbol takımında kaç oyuncu sahada olur?',
        options: ['11', '10', '12', '9'],
        correctAnswer: '11',
        explanation: 'Futbolda her takım 11 oyuncuyla sahada yer alır.'
      },
      {
        id: 'spo_e_2',
        question: 'NBA hangi sporun ligidirr?',
        options: ['Basketbol', 'Beyzbol', 'Amerikan Futbolu', 'Hokey'],
        correctAnswer: 'Basketbol',
        explanation: 'NBA (National Basketball Association), Amerikan profesyonel basketbol ligidirr.'
      },
      {
        id: 'spo_e_3',
        question: 'Wimbledon hangi spor dalında düzenlenir?',
        options: ['Tenis', 'Golf', 'Kriket', 'Ragbi'],
        correctAnswer: 'Tenis',
        explanation: 'Wimbledon, dünyanın en eski ve prestijli tenis turnuvasıdır.'
      }
    ],
    medium: [
      {
        id: 'spo_m_1',
        question: 'Hangi ülke en çok FIFA Dünya Kupası kazanmıştır?',
        options: ['Brezilya', 'Almanya', 'İtalya', 'Arjantin'],
        correctAnswer: 'Brezilya',
        explanation: 'Brezilya, 5 kez (1958, 1962, 1970, 1994, 2002) şampiyon olmuştur.'
      },
      {
        id: 'spo_m_2',
        question: 'Usain Bolt\'un 100 metre dünya rekoru kaç saniyedir?',
        options: ['9.58', '9.69', '9.72', '9.63'],
        correctAnswer: '9.58',
        explanation: 'Usain Bolt, 2009\'da Berlin\'de 9.58 saniyelik rekor kırdı.'
      },
      {
        id: 'spo_m_3',
        question: 'Formula 1\'de en çok şampiyonluk kazanan pilot kimdir?',
        options: ['Lewis Hamilton / Michael Schumacher', 'Ayrton Senna', 'Sebastian Vettel', 'Alain Prost'],
        correctAnswer: 'Lewis Hamilton / Michael Schumacher',
        explanation: 'Hamilton ve Schumacher\'in her birinin 7 şampiyonluğu vardır.'
      }
    ],
    hard: [
      {
        id: 'spo_h_1',
        question: 'İlk modern Olimpiyat Oyunları hangi şehirde düzenlenmiştir?',
        options: ['Atina', 'Paris', 'Londra', 'St. Louis'],
        correctAnswer: 'Atina',
        explanation: '1896 yılında Atina\'da düzenlenen ilk modern Olimpiyatlara 14 ülke katıldı.'
      },
      {
        id: 'spo_h_2',
        question: 'Hangi tenisçi en çok Grand Slam tekler şampiyonluğu kazanmıştır?',
        options: ['Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'Pete Sampras'],
        correctAnswer: 'Novak Djokovic',
        explanation: 'Djokovic, 24 Grand Slam şampiyonluğu ile rekor sahibidir (2024 itibariyle).'
      },
      {
        id: 'spo_h_3',
        question: 'Basketbolda "triple-double" ne demektir?',
        options: ['Üç istatistikte çift haneli sayı', 'Üç sayılık atış', 'Üç çeyrek oynamak', 'Üçlü takla'],
        correctAnswer: 'Üç istatistikte çift haneli sayı',
        explanation: 'Sayı, ribaund ve asist gibi üç kategoride 10+ istatistik yapmaktır.'
      }
    ]
  },
  
  'Mantık': {
    easy: [
      {
        id: 'log_e_1',
        question: 'Bir saat 3:15\'i gösteriyorsa, akrep ile yelkovan arasındaki açı kaç derecedir?',
        options: ['7.5', '15', '0', '30'],
        correctAnswer: '7.5',
        explanation: 'Saat 3:15\'te, akrep ile yelkovan arası 7.5 derecedir.'
      },
      {
        id: 'log_e_2',
        question: '5 elmanın 3\'ünü verirseniz, kaç elmanız kalır?',
        options: ['2', '3', '5', '8'],
        correctAnswer: '2',
        explanation: '5 - 3 = 2 elma kalır.'
      },
      {
        id: 'log_e_3',
        question: 'Hangi sayı dizide fazladan: 2, 4, 6, 7, 8, 10?',
        options: ['7', '8', '10', '2'],
        correctAnswer: '7',
        explanation: 'Dizi çift sayılardan oluşuyor, 7 tek sayıdır.'
      }
    ],
    medium: [
      {
        id: 'log_m_1',
        question: 'Bir odada 4 köşe var. Her köşede bir kedi, her kedinin önünde 3 kedi var. Toplam kaç kedi vardır?',
        options: ['4', '12', '16', '7'],
        correctAnswer: '4',
        explanation: 'Kediler dört köşededir ve birbirlerinin önündedir, toplam 4 kedi.'
      },
      {
        id: 'log_m_2',
        question: 'Bir pastayı 8 eşit parçaya ayırmak için minimum kaç kesim yapmalısınız?',
        options: ['3', '4', '7', '8'],
        correctAnswer: '3',
        explanation: 'Üç kesim (çapraz iki kesim + bir yatay kesim) ile 8 parça elde edilir.'
      },
      {
        id: 'log_m_3',
        question: 'Hangi sayı gelmelidir: 2, 6, 12, 20, 30, ?',
        options: ['42', '40', '36', '38'],
        correctAnswer: '42',
        explanation: 'Fark dizisi: 4, 6, 8, 10, 12... Sonraki: 30 + 12 = 42.'
      }
    ],
    hard: [
      {
        id: 'log_h_1',
        question: 'Bir tren 1 km uzunluğunda bir tünelden geçiyor. Tren 100 km/s hızla gidiyor ve 1 km uzunluğunda. Tamamen geçmesi kaç saniye sürer?',
        options: ['72', '36', '60', '48'],
        correctAnswer: '72',
        explanation: 'Toplam mesafe 2 km (tünel + tren). 100 km/s = 27.78 m/s, 2000m / 27.78 ≈ 72 saniye.'
      },
      {
        id: 'log_h_2',
        question: 'Üç anahtarınız var, üç kilitli kapı var. Her anahtar bir kapıyı açıyor ama hangisini bilmiyorsunuz. Tüm kapıları açmak için minimum kaç deneme yapmalısınız?',
        options: ['4', '3', '6', '9'],
        correctAnswer: '4',
        explanation: 'En kötü senaryoda: 1. kapıda 2, 2. kapıda 2 deneme = toplam 4.'
      },
      {
        id: 'log_h_3',
        question: 'Bir top 100 metre yükseklikten düşüyor. Her zıplamada yüksekliğin yarısına çıkıyor. Kaç zıplamadan sonra 1 metrenin altına düşer?',
        options: ['7', '6', '8', '5'],
        correctAnswer: '7',
        explanation: '100→50→25→12.5→6.25→3.125→1.56→0.78 (7 zıplama sonrası)'
      }
    ]
  }
};

function getQuestions() {
  return questions;
}

module.exports = { getQuestions };
