// Canvas'ı js'ye çekiyoruz.
const canvas = document.getElementById("oyunAlani");
const ctx = canvas.getContext("2d"); // 2 Boyutlu olması için

//DIŞARIDAN DOSYALARI YÜKLEME
const arkaplanResmi = new Image();
arkaplanResmi.src = "arkaplan.jpg"; 

const sincapResmi = new Image();
sincapResmi.src = "sincap.png"; 

const cekicSesi = new Audio();
cekicSesi.src = "cekic.mp3"; 

const cekicImlecResmi = new Image();
cekicImlecResmi.src = "cekic_imlec.png"; 

const arkaPlanMuzigi = new Audio();
arkaPlanMuzigi.src = "arka_plan_muzik.mp3"; 
arkaPlanMuzigi.loop = true; // Müzik bitince başa sarsın
let muzikCaliyor = false; // Müziğin durumunu kontrol etmek için değişken

//OYUN İÇİN GEREKLİ DEĞİŞKENLER
let puan = 0;
let seviye = 1;
let hedefler = []; // Sincapları bu listenin içinde tuttum
let can = 5; // Oyuncunun başlangıç canı
let oyunBitti = false; 

// Seviye hesaplamaları için puan sınırı
let oncekiSeviyePuani = 0; 
let siradakiSeviyePuani = 100; 

// Zaman ve hız ayarları
let sonHedefZamani = 0; 
let hedefCikmaAraligi = 1200; // sincap çıkma süresi
let ekrandaKalmaSuresi = 1800; // sincap'ın ekranda kalma süresi
let seviyeMesajiSuresi = 0; // seviye atlama yazısının ekranda kalma süresi

// Farenin anlık konumu
let imlecFareX = 0;
let imlecFareY = 0;

// Mouse kontrolü
// Fare ekranda hareket ettikçe koordinatları güncelleme (Çekiç çizimi için)
canvas.addEventListener('mousemove', function(olay) {
    imlecFareX = olay.offsetX;
    imlecFareY = olay.offsetY;
});

// Fareye tıklandığında (Vurma anı) çalışacak kodlar
canvas.addEventListener('mousedown', function(olay) {
    if (oyunBitti == true) return; // Oyun bittiğinde tıklama çalışmaması için

    // Müziği tıklayınca başlatıyorum
    if (muzikCaliyor == false) {
        arkaPlanMuzigi.play();
        muzikCaliyor = true;
    }

    const fareX = olay.offsetX;
    const fareY = olay.offsetY;
    let hedefVuruldu = false; 

    // Ekrandaki tüm sincapları sondan başa doğru kontrol ediyoruz
    for (let i = hedefler.length - 1; i >= 0; i--) {
        let h = hedefler[i];
        
        // Tıkladığımız nokta ile sincabın merkezi arasındaki mesafeyi ölçme
        let mesafe = Math.sqrt(Math.pow(fareX - h.x, 2) + Math.pow(fareY - h.y, 2));

        // Eğer mesafe yarıçaptan küçükse, sincabı vurduk demektir
        if (mesafe <= h.yaricap) {
            hedefVuruldu = true; 
            
            cekicSesi.currentTime = 0; // Sesi başa sar
            cekicSesi.play(); // Vurma sesini çal
            
            // Merkeze ne kadar yakın vurursak o kadar yüksek puan (en az 5, en fazla 45)
            let kazanilanPuan = Math.floor(45 - mesafe); 
            puan += kazanilanPuan; 
            
            // SEVİYE ATLAMA KONTROLÜ
            if (puan >= siradakiSeviyePuani) {
                seviye++;
                can++; // Ödül olarak 1 can ver
                oncekiSeviyePuani = siradakiSeviyePuani; 
                siradakiSeviyePuani += 150; // Sonraki seviye için hedefi 150 artır
                
                // Oyunu zorlaştırmak için süreleri kısıyorum
                hedefCikmaAraligi = Math.max(400, hedefCikmaAraligi * 0.9);
                ekrandaKalmaSuresi = Math.max(600, ekrandaKalmaSuresi * 0.9);
                
                seviyeMesajiSuresi = 120; // Yazı yaklaşık 2 saniye ekranda kalsın

                // Müziği seviyeye göre hızlandırıyorum
                let yeniHiz = 1 + (seviye - 1) * 0.10;
                if (yeniHiz > 2.5) { // Çok fazla hızlanıp bozulmasını engellemek için sınır koydum
                    yeniHiz = 2.5;
                }
                arkaPlanMuzigi.playbackRate = yeniHiz;
            }
            
            // Vurulan sincabı listeden (ekrandan) sil
            hedefler.splice(i, 1); 
            break; // Bir tıklamayla sadece bir tane vurmak için döngüyü bitir
        }
    }

    // Eğer döngü bittiğinde hiçbir hedef vurulamadıysa (boşa tıklandıysa) canı azalt
    if (hedefVuruldu == false) {
        canAzalt();
    }
});

// Can düşürme ve Oyun Bitiş kontrolü
function canAzalt() {
    can--;
    if (can <= 0) {
        oyunBitti = true; 
        arkaPlanMuzigi.pause(); // Oyun bitince müziği sustur
    }
}

// Oyunu r tuşuyla yeniden başlatma
window.addEventListener('keydown', function(olay) {
    // Sadece oyun bittiyse ve klavyeden 'r' veya 'R' tuşuna basıldıysa sıfırla
    if (oyunBitti == true && (olay.key === 'r' || olay.key === 'R')) {
        oyunuSifirla();
    }
});

// Oyunu Sıfırlama Fonksiyonu
function oyunuSifirla() {
    puan = 0;
    seviye = 1;
    hedefler = []; 
    can = 5; 
    oyunBitti = false; 
    oncekiSeviyePuani = 0; 
    siradakiSeviyePuani = 100; 
    hedefCikmaAraligi = 1200; 
    ekrandaKalmaSuresi = 1800; 
    seviyeMesajiSuresi = 0; 
    sonHedefZamani = 0;
    
    // Müziği başa sar ve hızını normale döndür
    arkaPlanMuzigi.currentTime = 0;
    arkaPlanMuzigi.playbackRate = 1.0;
    arkaPlanMuzigi.play();
    
    // Oyunu tekrar başlat
    requestAnimationFrame(oyunDongusu);
}


// OYUN MEKANİKLERİ VE ÇİZİMLER
// Rastgele koordinatlarda yeni bir sincap oluşturur
function hedefOlustur(guncelZaman) {
    const yaricap = 40; 
    
    // Sincabın ekrandan taşmaması için kenarlara yarıçap kadar sınır koyduk
    const yeniHedef = {
        x: Math.random() * (canvas.width - yaricap * 2) + yaricap,
        y: Math.random() * (canvas.height - yaricap * 2) + yaricap,
        yaricap: yaricap,
        dogmaZamani: guncelZaman // Ekranda kalma süresini hesaplamak için doğduğu anı kaydettim
    };
    hedefler.push(yeniHedef); // Yeni sincabı listeye ekle
}

// Vurulamayan sincapların kaybolması
function hedefleriGuncelle(guncelZaman) {
    for (let i = hedefler.length - 1; i >= 0; i--) {
        let h = hedefler[i];
        if (guncelZaman - h.dogmaZamani >= ekrandaKalmaSuresi) {
            hedefler.splice(i, 1); // Süresi dolanı sil
            canAzalt(); // Kaçırdığımız için can azalt
        }
    }
}

// Listedeki sincapları ekrana çizer
function hedefleriCiz() {
    for (let i = 0; i < hedefler.length; i++) {
        let h = hedefler[i];
        // Sincabı tam merkeze oturtmak için koordinatları ayarlıyoruz
        ctx.drawImage(sincapResmi, h.x - h.yaricap, h.y - h.yaricap, h.yaricap * 2, h.yaricap * 2);
    }
}

// Yazıları, canı ve ilerleme barını ekrana çizer
function arayuzCiz() {
    ctx.textAlign = "left"; 
    ctx.fillStyle = "white";
    ctx.font = "bold 24px Arial"; 
    ctx.shadowColor = "black"; // Yazılar orman arkaplanında okunabilsin diye siyah gölge
    ctx.shadowBlur = 5;
    
    ctx.fillText("Puan: " + puan, 20, 30);
    ctx.fillText("Seviye: " + seviye, canvas.width - 120, 30);
    
    ctx.fillStyle = "#ff4d4d";
    let kalpler = "❤️".repeat(Math.max(0, can)); 
    ctx.textAlign = "center";
    ctx.fillText("Can: " + kalpler, canvas.width / 2, 30);

    // İlerleme Barı Çizimi
    let barGenislik = 400; 
    let barYukseklik = 20; 
    let barX = (canvas.width - barGenislik) / 2; 
    let barY = 50; 

    // Barın doluluk oranını hesaplama
    let ilerlemeYuzdesi = (puan - oncekiSeviyePuani) / (siradakiSeviyePuani - oncekiSeviyePuani);
    if (ilerlemeYuzdesi > 1) ilerlemeYuzdesi = 1; 
    
    ctx.shadowBlur = 0; // Çizimlerde gölgeyi kapat
    ctx.fillStyle = "#333"; // Boş kısım (gri)
    ctx.fillRect(barX, barY, barGenislik, barYukseklik);
    
    ctx.fillStyle = "#4CAF50";  // Dolu kısım (yeşil)
    ctx.fillRect(barX, barY, barGenislik * ilerlemeYuzdesi, barYukseklik);
    
    ctx.strokeStyle = "white"; // Barın dış çerçevesi
    ctx.lineWidth = 2;
    ctx.strokeRect(barX, barY, barGenislik, barYukseklik);

    // Kalan Puan Yazısı
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 3;
    ctx.fillText("Sonraki Seviyeye: " + (siradakiSeviyePuani - puan) + " Puan", canvas.width / 2, barY + 15);
    
    // Seviye Atladın Bildirimi
    if (seviyeMesajiSuresi > 0) {
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 16px Arial";
        ctx.fillText("Seviye Atladın! +1 Can", canvas.width / 2, barY + 45);
        seviyeMesajiSuresi--; // Sayacı her karede azaltıyoruz
    }
    ctx.shadowBlur = 0; 
}


// Oyunun döngüsü
// 
function oyunDongusu(zaman) {
    // Ekranı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Arkaplanı çiz
    if (arkaplanResmi.complete) {
        ctx.drawImage(arkaplanResmi, 0, 0, canvas.width, canvas.height);
    }

    // Oyun bittiyse Game Over ekranını göster ve döngüyü durdur
    if (oyunBitti) {
        ctx.fillStyle = "red";
        ctx.font = "bold 50px Arial";
        ctx.textAlign = "center";
        ctx.shadowColor = "black";
        ctx.shadowBlur = 10;
        ctx.fillText("OYUN BİTTİ", canvas.width / 2, canvas.height / 2 - 20); // Yazıyı az yukarı çektim
        
        ctx.fillStyle = "white";
        ctx.font = "bold 30px Arial";
        ctx.fillText("Toplam Puan: " + puan, canvas.width / 2, canvas.height / 2 + 30);
        
    //Tekrar Oyna Bildirimi
        ctx.fillStyle = "#FFD700"; // Sarı renk
        ctx.font = "bold 20px Arial";
        ctx.fillText("Yeniden oynamak için 'R' tuşuna basın", canvas.width / 2, canvas.height / 2 + 80);

        // Fareyi (Çekici) yine de çiz
        ctx.drawImage(cekicImlecResmi, imlecFareX - 15, imlecFareY - 50, 65, 65);
        
        return; // Döngüyü burada kes
    }

    //Yeterli süre geçtiyse yeni sincap oluştur
    if (zaman - sonHedefZamani > hedefCikmaAraligi) {
        hedefOlustur(zaman);
        sonHedefZamani = zaman;
    }

    //Oyun elemanlarını güncelle ve ekrana çiz
    hedefleriGuncelle(zaman);
    hedefleriCiz();
    arayuzCiz();

    //En son çekici farenin tam ucuna çiz
    ctx.drawImage(cekicImlecResmi, imlecFareX - 15, imlecFareY - 50, 65, 65);
    
    //Bir sonraki kare için fonksiyonu tekrar çağır
    requestAnimationFrame(oyunDongusu); 
}

// Oyunu ilk kez başlatmak için döngüyü çağırıyoruz
requestAnimationFrame(oyunDongusu);