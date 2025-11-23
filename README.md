# Energia Berriztagarrien Kudeaketa Sistema

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-Educational-green.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Django](https://img.shields.io/badge/django-4.x-green.svg)

*Web aplikazio bat energia berriztagarrien datuen kudeaketa eta bistaratzerako*

</div>

---

## 📋 Aurkibidea

- [Testuingurua](#-testuingurua)
- [Taldea](#-taldea)
- [Ezaugarriak](#-ezaugarriak)
- [Diseinua](#-diseinua)
- [Arkitektura](#-arkitektura)
- [Teknologiak](#-teknologiak)
- [Instalazioa](#-instalazioa)
- [Konfigurazioa](#-konfigurazioa)
- [Erabilera](#-erabilera)
- [Segurtasuna](#-segurtasuna)
- [Garapena](#-garapena)
- [Dokumentazioa](#-dokumentazioa)
- [Etorkizuna](#-etorkizuna)
- [Lizentzia](#-lizentzia)

---

## 🎯 Testuingurua

Proiektu hau **Euskal Herriko Unibertsitatearen (EHU)** Energia Berriztagarrien Graduko ikasleen eta gure ikastetxeko **Web Aplikazioen Garapeneko (WAG)** ikasleen arteko lankidetza da.

### Helburua

Unibertsitateko ikasleek jasotzen dituzten energia datuak (potentzia, energia, eta bestelako metrikak) kudeatu eta modu erraz eta erabilgarrian bistaratzeko web interfaze bat garatzea.

### Balioa

- ✅ Datu energetikoen jarraipena erraztea
- ✅ Informazioaren ulermena hobetzea
- ✅ Energia berriztagarrien proiektuen efizientzia optimizatzea
- ✅ Irisgarritasuna eta erabilgarritasuna bermatzea

---

## 👥 Taldea

### Rolak eta Arduren Banaketaren

<table>
<tr>
<th>Rola</th>
<th>Kidea</th>
<th>Ardura Nagusiak</th>
</tr>
<tr>
<td><strong>Product Owner</strong></td>
<td>Jehangir Hayat</td>
<td>
• Proiektuaren helburuak definitzea<br>
• Bezeroen beharrak kudeatzea<br>
• Lehentasunak ezartzea<br>
• Laguntzailea gisa parte hartzea
</td>
</tr>
<tr>
<td><strong>Scrum Master</strong></td>
<td>Yeray Escabias</td>
<td>
• Agile metodologia erraztea<br>
• Oztopoak identifikatu eta kentzea<br>
• Taldea antolatzea<br>
• Aktak eta erabakiak dokumentatzea (Idazkaria)
</td>
</tr>
<tr>
<td><strong>Developer</strong></td>
<td>Josu Alvarez</td>
<td>
• Interfazea programatzea<br>
• Backend garapena<br>
• Taldea koordinatzea<br>
• Irakasle eta bezeroekin komunikazioa
</td>
</tr>
<tr>
<td><strong>Developer</strong></td>
<td>Alazne Garcia</td>
<td>
• Interfazea diseinatzea<br>
• Frontend garapena<br>
• Aurrerapenak aurkeztea (Bozeramailea)<br>
• Dokumentazioa prestatzea
</td>
</tr>
</table>

> **Oharra:** Nahiz eta rol espezifikoak izan, taldeko kide guztiak garapen lanetan parte hartzen dugu, elkarlanean arituz.

---

## ✨ Ezaugarriak

### Funtzionalitate Nagusiak

- 📊 **Datu bistaraketa** - Taula eta grafiko interaktiboak
- 👥 **Talde kudeaketa** - Administratzaileek taldeak sortu eta kudeatu ditzakete
- 📈 **Energia metrikak** - Potentzia, energia eta beste datu tekniko analizatu
- 🔒 **Autentifikazioa** - Erabiltzaile eta baimen kudeaketa segurua
- 📱 **Diseinu erantzulea** - Gailu guztietan ondo funtzionatzen du
- 🌐 **Euskarazko interfazea** - Tokiko hizkuntzan erabilgarri

---

## 🎨 Diseinua

### Diseinu Printzipioak

Gure interfazearen diseinuan **argitasuna, irakurgarritasuna eta estetika** izan dira lehentasunak.

### Kolore Paleta

#### 🖤 Textua (Argi/Iluna)

```css
#111826  /* Testu iluna */
#485563  /* Testu sekundarioa */
#E4E7F1  /* Testu argia */
#B892B0  /* Testu leuna */
```

#### 🌈 Kolore Nagusiak

Naturarekin, iraunkortasunarekin eta energiaren dinamismoarekin lotutako koloreak:

```css
#6F46A5  /* Bioleta - Teknologia eta berrikuntza */
#FC3M3D  /* Magenta - Energia eta indarra */
#1DBD41  /* Berde - Oreka eta hazkundea */
#01A638  /* Berde iluna - Ingurumenarekiko konpromisoa */
#FF8626  /* Laranja - Bizi-indarra */
#F97108  /* Laranja bero - Dinamismoa */
```

**Esanahia:**
- **Berdeak:** Oreka, hazkundea eta ingurumenarekiko konpromisoa
- **Laranjak:** Energia eta bizi-indarra
- **Bioleteak:** Ukitu teknologiko eta modernoa

#### 🎨 Bigarren Mailako Koloreak

Nabigazio-esperientzia hobetzeko kolore freskoak:

```css
#4F4CE5  /* Urdin bioleta */
#7C3MED  /* Lila */
#DEA5E9  /* Arrosa argia */
```

#### ⚠️ Alertak eta Mezuak

Sistema argia eta irisgarria jakinarazpenetarako:

```css
#DC2626  /* Gorria - Larrialdiak/Erroreak */
#059669  /* Berdea - Arrakasta/Baieztapenak */
#D97706  /* Laranja - Abisuak */
#2563EB  /* Urdina - Informazio neutroa */
```

### Tipografia

#### Poppins

Tipografia nagusia - Moderno eta garbia:
- Forma biribildu eta geometrikoak
- Irakurgarritasun handia
- Tonu berritzaile eta garaikidea
- Doakoa: [Google Fonts](https://fonts.google.com/specimen/Poppins)

```css
font-family: 'Poppins', sans-serif;
```

#### Sans Serif

Tipografia sekundarioa - Minimalista eta zuzena:
- Apaingarririk gabeko trazuak
- Eduki teknikorako egokia
- Irisgarritasuna hobetzen du
- Erabilera librea

```css
font-family: sans-serif;
```

### Logotipoa

- Forma **organikoa eta fluidoa**
- Energiaren mugimendua eta berrikuntza irudikatzen du
- Kolore **gradiente urdin-morea** (teknologia eta garbitasuna)
- Diseinu **sinple baina deigarria**
- Atzealde ilun eta argian ondo funtzionatzen du

### Ikonoak

**FontAwesome** liburutegia erabiltzen dugu:
- Ikusgarritasun handia
- Estilo koherentea
- Energia berriztagarrien kontzeptuak modu argian
- Diseinu profesionala

---

## 🏗️ Arkitektura

### MVC Eredua (Model-View-Controller)

Proiektuan **MVC arkitektura** erabili dugu, web aplikazioen garapenean estandarra dena.

```
┌─────────────────────────────────────────┐
│          ERABILTZAILEA                  │
└────────────────┬────────────────────────┘
                 │
                 ▼
         ┌───────────────┐
         │  CONTROLLER   │  ◄── Eskaerak kudeatzen ditu
         │  (Django)     │
         └───────┬───────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
  ┌─────────┐       ┌──────────┐
  │  MODEL  │       │   VIEW   │
  │(ORM/DB) │       │ (HTML/JS)│
  └─────────┘       └──────────┘
```

#### Osagaiak

**Modeloa (Model)**
- Datuen kudeaketa
- Datu-baseko kontsultak
- Negozio logika

**Bista (View)**
- Interfaze bisuala
- Taulak eta grafikoak
- Formularioak

**Kontrolatzailea (Controller)**
- Erabiltzailearen ekintzen kudeaketa
- Modeloa eta Bista koordinatzea
- Erantzunak kudeatzea

### Sistema Arkitektura Zehatza

```
┌──────────────┐
│   Bezeroa    │
│  (Browser)   │
└──────┬───────┘
       │ HTTPS
       ▼
┌──────────────────────┐
│  Windows Server 10   │
│  IIS + ARR          │  ◄── Reverse Proxy + SSL
│  (Reverse Proxy)    │
└──────┬───────────────┘
       │ HTTP
       ▼
┌──────────────────────┐
│   Apache + Django    │  ◄── Aplikazio Zerbitzaria
│   (Python)           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│  Ubuntu + Docker     │
│  PostgreSQL          │  ◄── Datu-base Zerbitzaria
└──────────────────────┘
```

---

## 💻 Teknologiak

### Frontend

| Teknologia | Bertsioa | Erabilera |
|------------|----------|-----------|
| HTML5 | - | Egitura |
| CSS3 | - | Estiloak |
| JavaScript | ES6+ | Interaktibitasuna |
| FontAwesome | Latest | Ikonoak |

### Backend

| Teknologia | Bertsioa | Erabilera |
|------------|----------|-----------|
| Python | 3.8+ | Programazio-lengoaia |
| Django | 4.x | Web Framework |
| Django ORM | - | Datu-base abstrakzioa |
| Apache | 2.4+ | Web zerbitzaria |

### Datu-basea

| Teknologia | Bertsioa | Erabilera |
|------------|----------|-----------|
| PostgreSQL | 13+ | Datu-base erlazionala |
| Docker | Latest | Kontenedore kudeaketa |

### Garapenerako Tresnak

| Tresna | Plataforma | Funtzioa |
|--------|------------|----------|
| VS Code | Windows/Linux | Kode editorea |
| GitHub | Cloud | Bertsio kontrola |
| GitHub Desktop | Windows | Git interfaze grafikoa |
| Docker Desktop | Windows | Kontenedore garapena |

### Sistema Eragileak

**Garapena:**
- Windows 10/11 (4 garatzaileen ekipoak)

**Ekoizpena:**
- Ubuntu Linux (Datu-base zerbitzaria)
- Windows Server 10 (Reverse Proxy + SSL)

---

## 🚀 Instalazioa

### Aurrebaldintzak

Instalatu beharreko software-a:

```bash
✓ Python 3.8 edo berriagoa
✓ pip (Python pakete kudeatzailea)
✓ PostgreSQL 13+
✓ Docker eta Docker Compose
✓ Git
```

### 1. Errepositorioaren Klonaketa

```bash
git clone https://github.com/zure-erabiltzailea/energia-proiektua.git
cd energia-proiektua
```

### 2. Ingurune Birtuala Sortu

**Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Dependentziak Instalatu

```bash
pip install -r requirements.txt
```

### 4. Ingurune Aldagaiak Konfiguratu

`.env` fitxategia sortu proiektuaren erroan:

```env
# Django Konfigurazioa
SECRET_KEY=zure-gako-segurua-hemen
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Datu-basea
DB_NAME=energia_db
DB_USER=postgres
DB_PASSWORD=zure-pasahitza
DB_HOST=localhost
DB_PORT=5432

# Segurtasuna
CSRF_TRUSTED_ORIGINS=http://localhost:8000
```

### 5. Docker Kontenedoreak Abiarazi

```bash
docker-compose up -d
```

Egiaztatu kontenedoreak martxan daudela:

```bash
docker ps
```

### 6. Datu-basea Prestatu

```bash
# Migrazioak sortu
python manage.py makemigrations

# Migrazioak exekutatu
python manage.py migrate

# Superuser bat sortu (aukerakoa)
python manage.py createsuperuser
```

### 7. Fitxategi Estatikoak Bildu

```bash
python manage.py collectstatic --noinput
```

### 8. Zerbitzaria Abiarazi

```bash
python manage.py runserver
```

Aplikazioa eskuragarri egongo da: **http://localhost:8000**

---

## ⚙️ Konfigurazioa

### Datu-basea

PostgreSQL datu-basea Docker bidez exekutatzen da:

```yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: energia_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: zure-pasahitza
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Apache Konfigurazioa (Ekoizpena)

```apache
<VirtualHost *:80>
    ServerName zure-domeinua.eus
    
    # HTTP -> HTTPS birbideraketa
    Redirect permanent / https://zure-domeinua.eus/
</VirtualHost>

<VirtualHost *:443>
    ServerName zure-domeinua.eus
    
    SSLEngine on
    SSLCertificateFile /path/to/cert.pem
    SSLCertificateKeyFile /path/to/key.pem
    
    ProxyPass / http://localhost:8000/
    ProxyPassReverse / http://localhost:8000/
</VirtualHost>
```

---

## 📖 Erabilera

### Administratzailea

#### Taldeak Kudeatzea

1. Admin panelera sartu: `/admin`
2. Taldeak atalera joan
3. Talde berria sortu
4. Kideak gehitu/kendu

#### Erabiltzaileak Kudeatzea

1. Erabiltzaileak atalera joan
2. Erabiltzaile berria sortu
3. Baimenak esleitu
4. Taldeei esleitu

### Erabiltzailea

#### Datuak Ikusi

1. Dashboard-era sartu
2. Grafiko eta taulak kontsultatu
3. Datuak filtratu (data, taldea...)
4. Txostenak exportatu

#### Taldean Lan Egin

1. Nire Taldea atalera joan
2. Taldekideen zerrenda ikusi
3. Taldearen datuak kontsultatu

---

## 🔒 Segurtasuna

### SQL Injection Babesa

Gure sistemak zenbait neurri hartzen ditu SQL Injection erasoak saihesteko:

#### Babespen Mekanismoak

✅ **Django ORM erabilera**
- Kontsulta parametrizatuak automatikoki
- Inputen ihes-karaktereak automatikoak

✅ **Inputen balidazioa**
- SQL komandoen blokeoa
- JavaScript kode exekutagarrien blokeoa
- Testu garbi soilik onartzen da

✅ **Baimen kontrola**
- Erabiltzaile autentifikazioa
- Rol baseko baimenen sistema
- Ekintza auditoria

#### Adibidea

❌ **Seguru GABEA** (SQL Injection ahula):
```python
# EZ ERABILI HAU
query = f"SELECT * FROM users WHERE name = '{user_input}'"
```

✅ **SEGURUA** (Django ORM):
```python
# ERABILI HAU
User.objects.filter(name=user_input)
```

### SSL/TLS Konfigurazioa

Ekoizpenean HTTPS protokoloa erabiltzen da:

- Windows Server 10-en IIS bidez SSL ziurtagiria kudeatu
- HTTP trafikoa automatikoki HTTPS-ra birbideratzen da
- TLS 1.2 edo berriagoa erabiltzen da

### Segurtasun Onenen Praktikak

```python
# settings.py (Ekoizpena)

# HTTPS ezarpenak
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# HSTS (HTTP Strict Transport Security)
SECURE_HSTS_SECONDS = 31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# Beste segurtasun ezarpenak
X_FRAME_OPTIONS = 'DENY'
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
```

---

## 🛠️ Garapena

### Branch Egitura

```
main/
├── develop/              # Garapen nagusia
├── dokumentazioa/        # Estilo gida, kolore paleta
└── sistemas-informatikoak/  # HW/SW informazioa
```

### Workflow

1. **Branch berria sortu**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/funtzionalitate-berria
   ```

2. **Aldaketak egin**
   ```bash
   git add .
   git commit -m "feat: funtzionalitate berria gehitu"
   ```

3. **Push egin eta PR sortu**
   ```bash
   git push origin feature/funtzionalitate-berria
   ```

4. **Code Review eta Merge**

### Commit Konbentzioak

Gure taldeak jarraitzen ditugu:

- `feat:` Funtzionalitate berria
- `fix:` Akats konponketa
- `docs:` Dokumentazio aldaketak
- `style:` Kode estilo aldaketak
- `refactor:` Kode berregituratzea
- `test:` Testak gehitu
- `chore:` Mantentze lanak

### Agile Metodologia

#### Sprint Egitura

- **Iraupena:** 1-2 aste
- **Daily Stand-up:** 10 minutu (egunero)
- **Sprint Planning:** Sprint hasieran
- **Sprint Review:** Sprint amaieran
- **Sprint Retrospective:** Hobekuntza jarraituak

#### Sprint Board

```
┌──────────┬──────────┬──────────┬──────────┐
│   TODO   │  DOING   │ REVIEW   │   DONE   │
├──────────┼──────────┼──────────┼──────────┤
│ Task 1   │ Task 3   │ Task 5   │ Task 7   │
│ Task 2   │ Task 4   │ Task 6   │ Task 8   │
└──────────┴──────────┴──────────┴──────────┘
```

---

## 📚 Dokumentazioa

### Proiektu Egitura

```
energia-proiektua/
├── config/
│   ├── settings.py       # Django ezarpenak
│   ├── urls.py           # URL konfigurazioa
│   └── wsgi.py           # WSGI konfigurazioa
├── apps/
│   ├── users/            # Erabiltzaile kudeaketa
│   ├── teams/            # Talde kudeaketa
│   ├── data/             # Datu kudeaketa
│   └── dashboard/        # Dashboard nagusia
├── static/
│   ├── css/              # Estiloak
│   ├── js/               # JavaScript
│   └── images/           # Irudiak
├── templates/            # HTML txantiloiak
├── docker-compose.yml    # Docker konfigurazioa
├── requirements.txt      # Python dependentziak
├── .env.example          # Ingurune aldagaien adibidea
└── README.md            # Fitxategi hau
```

### API Dokumentazioa

Proiektuak Django REST Framework erabili dezake etorkizunean API bat eskaintzeko.

---

## 💰 Kostuak

### Proiektuaren Aurrekontua

| Jarduera | Orduak | Ordu-tasa | Kostua (€) |
|----------|--------|-----------|------------|
| Hasierako planifikazioa | 20 | 45€ | 900 |
| Diseinua | 25 | 45€ | 1.125 |
| Funtzionalitatea | 100 | 45€ | 4.500 |
| Pertsonalizazioa | 30 | 45€ | 1.350 |
| Testaketa | 55 | 45€ | 2.475 |
| Datu-basea | 5 | 45€ | 225 |
| Dockerizazioa | 20 | 45€ | 900 |
| Azpiegitura | 60 | 45€ | 2.700 |
| Zerbitzaria | 35 | 45€ | 1.575 |
| Antolakuntza | 10 | 45€ | 450 |
| Teams | 18 | 45€ | 810 |
| **GUZTIRA** | **378** | | **17.010 €** |
| **BEZ (21%)** | | | **3.572,10 €** |
| **TOTALA** | | | **20.582,10 €** |

### Bezeroarentzako Kostua

Pertsonalizazio (1.350 €) eta bezeroekin bilerak (180 €) kenduta:

**Bezero adaptazioa: 1.530 €**

---

## 🔮 Etorkizuna

### Aurreikusitako Hobekuntzak

- [ ] **Formulak webgunean bertan**
  - Formulak zuzenean webgunean sortu
  - Datu-bilketa erraztea
  - Validazio automatikoa

- [ ] **Grafiko aurreratuak**
  - Bistaratze interaktiboagoak
  - Datu-analisi tresnak
  - Txosten pertsonalizatuak

- [ ] **Erabiltzaile esperientzia**
  - Interfaze azkarragoa
  - Diseinu hobekuntzak
  - Irisgarritasun hobekuntzak

- [ ] **API Publikoa**
  - REST API bat eskaintzea
  - Kanpoko integrazioak ahalbidetzea
  - Dokumentazio osoa

- [ ] **Aplikazio mugikorra**
  - iOS eta Android bertsioak
  - Push jakinarazpenak
  - Offline modua

---

## 📝 Ondorioak

### Talde-antolaketa ⭐⭐⭐⭐⭐

Talde moduan **antolaketa bikaina** izan dugu:
- Eguneko bilera laburrak (10 min)
- Komunikazio argia eta errespetuzkoa
- Lan-dinamika positiboa
- Zeregin banaketa eraginkorra

### Alderdi Ekonomikoa 💰

- Denbora galera puntualak izan ditugu
- Arrazoi azkar konpondu ditugu
- **Aurrekontutik desbideratze txikia**
- Baliabide kudeaketa egokia

### Alderdi Teknikoa 🔧

**Erronkak:**
- Zerbitzari konfigurazioan zailtasunak
- Kode kontrolaren galera hasieran

**Konponketak:**
- Ikaskideen laguntza ezinbestekoa
- Proiektua berrabiarazi (erabaki egokia)
- **Kode garbiagoa eta antolatuagoa** lortu

**Ikasitakoak:**
- Lankidetza garrantzitsua da
- Planifikazio ona funtsezkoa da
- Berrabiaraztea batzuetan hoberena da

---

## 📄 Lizentzia

Proiektu hau **ikaskuntza helburuetarako** sortu da EHU eta gure ikastetxearen arteko lankidetza proiektuaren barruan.

---

## 📧 Kontaktua

### Taldea

- **Koordinatzailea:** Josu Alvarez
- **Bozeramailea:** Alazne Garcia
- **Scrum Master:** Yeray Escabias
- **Product Owner:** Jehangir Hayat

### Laguntza

Zalantzak edo arazoak badituzun:

1. Ireki issue bat GitHub-en
2. Jarri harremanetan taldeko kideekin
3. Kontsultatu dokumentazioa

---

## 🙏 Eskerrak

Eskerrak eman nahi dizkiogu:

- **EHU (Euskal Herriko Unibertsitatea)** - Lankidetzagatik eta konfiantzagatik
- **Energia Berriztagarrien Graduko ikasleak** - Proiektuaren beharrizanei erantzuten laguntzeagatik
- **Gure irakasleak** - Gidagatik eta laguntza teknikoagatik
- **Gure ikaskideak** - Laguntza eta aholkuengatik
- **Bezero taldea** - Feedback eta pazientziagatik

---

<div align="center">

**Egilea:** WAG Taldea | **Bertsioa:** 1.0.0 | **Azken eguneraketa:** 2025

*Energia berriztagarriekin, etorkizun jasangarrirako* 🌱

</div>
