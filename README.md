## Kurulum Yönergeleri

1. Projeyi klonlayın:  
   `git clone <proje-linki>`

2. Klonlama işlemi tamamlandıktan sonra tercih ettiğiniz IDE'de projeyi açın **ya da** terminal ile kök dizine gidin.

3. Eğer IDE üzerinden açtıysanız, IDE'nin arayüzünden kök dizinde bir terminal başlatın.

4. Terminale şu komutu yazın ve çalıştırın:  
   `npm install`  
   Bu komut, `package.json` dosyasında belirtilen tüm bağımlılıkları yükler.

5. Proje kök dizininde bir `.env` dosyası oluşturun.

6. `.env` dosyasının içine aşağıdaki satırı **tırnak işareti olmadan** ve **boşluk bırakmadan** yazın:  
   `VITE_GEMINI_API_KEY={Sizin_API_KEYiniz}`

7. Son olarak, terminalde şu komutu çalıştırarak projeyi başlatın:  
   `npm run dev`  
   Bu komut sonrası proje `localhost` üzerinde çalışmaya başlayacaktır.

## Database Bağlantısı

1. Database tarafının çalışması için bilgisayarınızda PostgreSQL'in kurulu olması gerekiyor.

2. Kurulu olup olmadığını kontrol etmek için terminalinize `where psql` yazabilirsiniz.

3. Kurulumu yapıp hizmetler kısmında PostgreSQL'in çalıştığına emin olduktan sonra terminalde projenin kök dizinini açın ve sırasıyla aşağıdaki komutları girin:  
   `cd backend`  
   `pip install -r requirements.txt`

4. Yükleme işlemi tamamlandıktan sonra backend dizini içerisinde `uvicorn main:app --reload` komutunu çalıştırın.

5. Şu an database bağlantısı kurulmuş olmalı. Eğer kurulmadıysa database tarafında kullanıcı isminiz ya da şifreniz gibi kısımları kontrol ediniz.

