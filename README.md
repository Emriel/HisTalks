Clone'ladıktan sonra tercih edilen IDE'de açılır ya da terminalle kök dosyanın olduğu konuma da gelinebilir. 
IDE ile açıldıysa arayüz üzerinden kök dizinde bir terminal açılır.
Dosya gezginine terminalle gelip npm install çalıştırılır. Bu komut package.json dosyasındaki gereksinimleri kurar.
.env dosyası oluşturulur.
.env dosyasının içerisine "VITE_GEMINI_API_KEY={Sizin_API_KEYiniz}" şeklinde bir satır boşluk bırakılmadan ve tırnak (") işaretleri olmadan yazılır.
Ardından kök dizindeki terminalde "npm run dev" komutu çalıştırıldığında proje localhost üzerinde çalışacaktır.
