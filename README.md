## ValCase

Valorant kozmetiklerini neon UI ile sunan interaktif kasa açma deneyimi. Veri seti doğrudan [Valorant API](https://dash.valorant-api.com/) uç noktalarından çekilir ve kasalara dağıtılır.

### Özellikler
- **Çoklu sayfa deneyimi**: `/` kasalar ve içerik vitrini, `/profile` ise kullanıcı profilini ve envanteri gösterir.
- **Canlı içerik**: Ajanlar, silah skinleri, haritalar, oyuncu kartları ve seviye kartları `https://valorant-api.com/v1` üzerinden yüklenir.
- **Ağırlıklı kasa motoru**: `data/cases.ts` dosyasında tanımlanan loot tabloları ile her kasanın fiyatı ve drop yüzdeleri modellenir.
- **UI/UX**: Aceternity & MagicUI bileşenlerinden ilham alan cam paneller, neon gradientler ve holografik kartlar.
- **Ekonomi geribildirimi**: Bakiye durumu, anlık kazanç/kayıp bilgisi ve son 5 drop paneli.
- **Mongo Atlas profili**: Kullanıcı bakiyesi, açılan kasa sayısı ve envanter bilgisi MongoDB Atlas koleksiyonunda saklanır (env yoksa varsayılan mock veri döner).

### Geliştirme

```bash
npm install
npm run dev
```

`http://localhost:3000` adresini açarak güncel arayüzü görebilirsin. Kasalar istemci tarafında simüle edilir, dolayısıyla kullanıcı başına demo bakiyesi tutulur.

### Ortam Değişkenleri

1. Mongo Atlas üzerinde bir cluster oluştur.
2. `Connection String` değerini `.env.local` dosyasına ekle:

```
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster-url>/valcase?retryWrites=true&w=majority"
```

`MONGODB_URI` ayarlanmazsa profil sayfası varsayılan mock veriyi kullanacaktır.

### API Kullanımı
| Domain | Endpoint | Not |
| --- | --- | --- |
| Ajanlar | `https://valorant-api.com/v1/agents?isPlayableCharacter=true` | Portre, rol ve gradient bilgisi alınır. |
| Skinler | `https://valorant-api.com/v1/weapons/skins` | `contentTierUuid` nadirlik + çarpan sağlar. |
| Haritalar | `https://valorant-api.com/v1/maps` | Splash ve lore özetleri kullanılır. |
| Kartlar | `https://valorant-api.com/v1/playercards` | Geniş ve dikey görseller. |
| Level borders | `https://valorant-api.com/v1/levelborders` | Hesap çerçeveleri ve başlangıç seviyeleri. |

### Scriptler
- `npm run dev`: Yerel geliştirme sunucusu
- `npm run build`: Prod build
- `npm run start`: Build sonrası sunucu
- `npm run lint`: ESLint
