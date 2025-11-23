# Energia Berriztagarrien Kudeaketa Sistema

## 📋 Proiektuaren Deskribapena

Web aplikazio hau **Euskal Herriko Unibertsitatearen (EHU)** eta gure ikastetxearen arteko lankidetza proiektuaren ondorioz sortu da. Aplikazioaren helburua da Energia Berriztagarrien Graduko ikasleek jasotako energia datuak modu erraz eta erabilgarrian kudeatu eta bistaratzea, proiektuen efizientzia eta irisgarritasuna hobetzeko.

---

## 🎯 Helburuak

- Datu energetikoen jarraipena eta ulermena erraztea
- Interfaze argi eta intuitibo bat eskaintzea
- Energia berriztagarrien proiektuen efizientzia hobetzea
- Datuen bistaratze eraginkorra bermatzea

---

## 👥 Taldea

### Rolak

| Rola | Kide | Deskribapena |
|------|------|--------------|
| **Product Owner** | Jehangir Hayat | Proiektuaren helburuak eta bezeroen beharrak kudeatzen ditu |
| **Scrum Master** | Yeray Escabias | Metodologia azkarra errazten du eta oztopoak kentzen ditu |
| **Developer** | Alazne Garcia | Interfazea eta funtzionalitateak garatzen ditu |
| **Developer** | Josu Alvarez | Interfazea eta funtzionalitateak garatzen ditu |

### Antolaketa Espezifikoa

- **Koordinatzailea:** Josu Alvarez
- **Bozeramailea:** Alazne Garcia
- **Idazkaria:** Yeray Escabias
- **Laguntzailea:** Jehangir Hayat

---

## 🎨 Diseinua

### Kolore Paleta

**Kolore Nagusiak:**
- Berdeak, hori-laranjak eta bioleta tonuak
- Naturarekin, iraunkortasunarekin eta berrikuntzarekin lotutako koloreak

**Bigarren Mailakoak:**
- Tonu freskoak eta argiak nabigazio-esperientzia hobetzeko

**Alertak:**
- 🔴 Gorria: Larrialdiak/Erroreak
- 🟢 Berdea: Ekintza zuzenak
- 🟠 Laranja: Abisuak
- 🔵 Urdina: Informazio neutroa

### Tipografia

- **Poppins:** Tipografia nagusia, modernoa eta irakurgarria
- **Sans Serif:** Eduki teknikoa eta datuak bistaratzeko

### Ikonoak

FontAwesome liburutegia erabiltzen da ikusgarritasun eta estilo koherenteagatik.

---

## 🏗️ Arkitektura

### MVC Eredua

Proiektuan **MVC (Model-View-Controller)** arkitektura erabili dugu:

- **Modeloa (Model):** Datuen kudeaketa eta datu-baseko kontsultak
- **Bista (View):** Interfaze bisuala (taulak, grafikoak, formularioak)
- **Kontrolatzailea (Controller):** Erabiltzailearen ekintzen kudeaketa

---

## 💻 Teknologiak

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- **Django** (Python framework)
- **Apache** web zerbitzaria
- **PostgreSQL** datu-basea

### Ingurune eta Tresnak
- **Docker** (kontenedoreak kudeatzeko)
- **GitHub** (kodearen bertsio kontrola)
- **GitHub Desktop** (interfaze grafikoa)

### Sistema Eragileak
- **Windows 10/11** (garapen ingurunea)
- **Ubuntu Linux** (ekoizpen zerbitzaria)
- **Windows Server 10** (IIS + ARR reverse proxy)

---

## 📦 Instalazioa

### Aurrebaldintzak

```bash
- Python 3.8+
- Docker
- Git
```

### Pausuak

1. **Errepositorioaren klonaketa:**
```bash
git clone https://github.com/zure-erabiltzailea/energia-proiektua.git
cd energia-proiektua
```

2. **Ingurune birtuala sortu:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. **Dependentziak instalatu:**
```bash
pip install -r requirements.txt
```

4. **Docker kontenedoreak abiarazi:**
```bash
docker-compose up -d
```

5. **Migrazioak exekutatu:**
```bash
python manage.py migrate
```

6. **Garapen zerbitzaria abiarazi:**
```bash
python manage.py runserver
```

Webgunea eskuragarri egongo da: `http://localhost:8000`

---

## 🔒 Segurtasuna

### SQL Injection Babesa

- Django ORM erabiltzen da kontsulta seguruentzat
- Inputen balidazio zorrotza
- SQL, JavaScript edo komando exekutagarrien blokeoa
- Testu garbi soilik onartzen da erabiltzaileen sarreretan

---

## 🌿 Adarrak (Branches)

```
├── main              # Ekoizpen bertsioa
├── develop           # Garapen nagusia
├── dokumentazioa     # Estilo gida eta diseinua
└── sistemas-informatikoak  # HW/SW informazioa
```

---

## 📊 Proiektuaren Kudeaketa

### Metodologia: Agile (Scrum)

- **Sprint-ak:** 1-2 asteko iterazioak
- **Egunero bilerak:** 10 minutuko daily stand-ups
- **Komunikazioa:** WhatsApp taldea bezeroekiko harremanetan

### Tresnak

- **GitHub:** Kodearen bertsio kontrola
- **VS Code:** Garapen ingurunea
- **Docker:** Kontenedore kudeaketa

---

## 💰 Aurrekontua

| Jarduera | Orduak | Kostua (€) |
|----------|--------|------------|
| Hasierako planifikazioa | 20 | 900 |
| Diseinua | 25 | 1.125 |
| Funtzionalitatea | 100 | 4.500 |
| Pertsonalizazioa | 30 | 1.350 |
| Testaketa | 55 | 2.475 |
| Datu-basea | 5 | 225 |
| Dockerizazioa | 20 | 900 |
| Azpiegitura | 60 | 2.700 |
| Zerbitzaria | 35 | 1.575 |
| Antolakuntza | 28 | 1.260 |
| **GUZTIRA** | **378** | **17.010 €** |
| **BEZ (21%)** | | **3.572,10 €** |
| **TOTALA** | | **20.582,10 €** |

*Ordu-tasa: 45€*

---

## 🚀 Etorkizuneko Hobekuntzak

- [ ] Webgunean bertan formulak sortzeko aukera
- [ ] Grafiko aurreratuak eta datu-analisia
- [ ] Mantenu eta hobekuntza jarraituak
- [ ] Erabiltzaile esperientziaren optimizazioa

---

## 📝 Lizentzia

Proiektu hau ikaskuntza helburuetarako sortu da EHUren eta ikastetxearen arteko lankidetzaren barruan.

---

## 📧 Kontaktua

Zalantzak edo kontsultak izanez gero, jarri harremanetan taldeko kideekiko:

- **Koordinatzailea:** Josu Alvarez
- **Bozeramailea:** Alazne Garcia

---

## 🙏 Eskerrak

Eskerrak eman nahi dizkiogu:
- **EHU (Euskal Herriko Unibertsitatea)** lankidetzagatik
- Energia Berriztagarrien Graduko ikasleei
- Gure irakasleei laguntza eta gidagatik

---

**Azken eguneraketa:** 2025

**Bertsioa:** 1.0.0
