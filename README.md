# ZINK Oyunu hakkında

HTML5 Canvas ile hazırlanmış basit bir refleks oyunudur.

1) Özellikler

*   **Temel Mekanik:** Ekranda rastgele koordinatlarda beliren hedefleri (sincapları), ekranda kalma süreleri dolmadan fare ile tıklayarak etkisiz hale getirme.
*   **Özel İmleç:** Oyunun atmosferini ve vuruş hissini artırmak için standart beyaz fare imleci gizlenmiş, yerine farenin konumunu takip eden "Çekiç" görseli entegre edilmiştir.
*   **Dinamik Puanlama (Merkez Odaklı):** Tıklanan noktanın hedefin tam merkezine olan uzaklığı Pisagor teoremi ile hesaplanır. Merkeze ne kadar yakın vurulursa o kadar yüksek puan (5 ile 45 puan arası) kazanılır.
*   **Seviye ve Zorluk Sistemi:** İlerleme barı dolduğunda ve seviye atlandığında, hedeflerin ekrana gelme aralıkları ve ekranda kalma süreleri %10 oranında kısaltılarak oyun dinamik olarak zorlaştırılır.
*   **Ödül Mekanizması:** Oyuncuyu motive etmek amacıyla her seviye atlandığında ekranda görsel bir bildirim çıkar ve oyuncuya +1 Can verilir.
*   **Dinamik Ses ve Müzik:** Vuruş anında çekiç sesi çalar. Ayrıca oyun boyunca çalan arka plan müziği, seviye atladıkça kademeli olarak hızlanır ve artan gerilimi oyuncuya yansıtır.
*   **Zengin Arayüz (HUD):** Ekranın üst kısmında canlı olarak güncellenen Puan, Seviye, Kalp ikonlarıyla Can durumu ve bir sonraki seviyeye kalan puanı gösteren yeşil ilerleme barı bulunmaktadır.

2) Nasıl Oynanır?

1.  Sayfa açıldığında oyun başlar. Müziğin başlaması için oyun alanına bir kez tıklamanız yeterlidir.
2.  Ekranda rastgele beliren sincapların üzerine süresi dolup kaçmadan önce farenizle (çekiçle) tıklayın.
3.  Hedefin tam ortasına vurmaya çalışın. Merkeze vurmak daha fazla puan kazandırır.
4.  Boşa tıklarsanız veya bir sincap vurulmadan süresi dolup ekrandan kaybolursa 1 Can kaybedersiniz.
5.  Üstteki barı doldurduğunuzda seviye atlarsınız. Sincaplar çok daha hızlı çıkıp kaçmaya başlar, ancak her seviyede +1 Can kazanırsınız.
6.  Canınız sıfırlandığında "Oyun Bitti" ekranı gelir. Yeniden oynamak için klavyeden `R` tuşuna basmanız yeterlidir.

3) Proje Detayları ve Kaynaklar
* Esinlenilen Oyun: Killover 
* Oyunun Bağlantısı: https://quentindelvallet.itch.io/killover
* (Not: Geliştirilen bu projede Killover oyununun sadece 'hızlanarak artan refleks testi' ve 'süreli hedef' mekaniği örnek alınmıştır)
   
4) Kullanılan Asset Kaynakları:
   
*   Arka Plan Görseli: Yapay zeka kullanılarak üretilmiştir.
*   Sincap Görseli: Yapay zeka kullanılarak üretilmiştir.
*   Çekiç Görseli: Yapay zeka kullanılarak üretilmiştir.
*   Ses Efektleri (Çekiç ve Müzik): [https://freesound.org/people/HlySound/sounds/847444/] [https://freesound.org/people/Michael-DB/sounds/489035/]

 **[Oyunu denemek için tıklayınız!](https://bambilo.github.io/Js-oyuntasarimi/)**
