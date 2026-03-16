# Panduan Self-Host Judge0 di Oracle Cloud (Gratis)

Deploy Judge0 CE di Oracle Cloud Free Tier — dari daftar akun sampai IP siap dipakai di `.env`.

---

## Daftar Isi

1. [Daftar Oracle Cloud](#1-daftar-oracle-cloud)
2. [Buat VM Instance](#2-buat-vm-instance)
3. [Konfigurasi Firewall & Security](#3-konfigurasi-firewall--security)
4. [Setup Server (SSH)](#4-setup-server-ssh)
5. [Install Docker](#5-install-docker)
6. [Deploy Judge0](#6-deploy-judge0)
7. [Test & Verifikasi](#7-test--verifikasi)
8. [Update .env Project](#8-update-env-project)
9. [Opsional: Domain + HTTPS](#9-opsional-domain--https)

---

## 1. Daftar Oracle Cloud

1. Buka **https://cloud.oracle.com** → klik **Start for free**
2. Isi form pendaftaran:
   - Email aktif
   - Nama lengkap
   - Password
3. Pilih **Home Region** → pilih **`ap-singapore-1` (Singapore)** untuk latency terbaik dari Indonesia
   > ⚠️ Region **tidak bisa diubah** setelah daftar — pilih dengan benar
4. Verifikasi nomor HP (kode SMS)
5. Masukkan **kartu kredit/debit** untuk verifikasi identitas
   > Tidak ada charge selama pakai Always Free resources
6. Selesaikan pendaftaran → tunggu email konfirmasi (biasanya 5-15 menit)
7. Login ke Oracle Cloud Console

---

## 2. Buat VM Instance

### 2a. Buka Create Instance

1. Di Oracle Console → klik **☰ (hamburger)** → **Compute** → **Instances**
2. Klik **Create instance**

### 2b. Konfigurasi Instance

**Name:**
```
judge0-server
```

**Placement:** biarkan default (Availability Domain 1)

**Image & Shape:**
1. Klik **Edit** di bagian Image and shape
2. **Image** → pilih **Ubuntu** → **Ubuntu 22.04** (Minimal)
3. **Shape** → klik **Change shape**
   - Series: **Ampere**
   - Shape: **VM.Standard.A1.Flex**
   - OCPU: **2**
   - Memory: **8 GB**
   - Klik **Select shape**

> Pastikan muncul tulisan **"Always Free-eligible"**

**Networking:** biarkan default (akan dibuat VCN baru otomatis)

**Add SSH keys:**
1. Pilih **Generate a key pair for me**
2. Klik **Save private key** → simpan file `ssh-key-*.key` di komputer kamu
3. Klik **Save public key** (opsional)

**Boot volume:**
- Size: **50 GB** (default, sudah cukup)
- Biarkan opsi lain default

### 2c. Launch

Klik **Create** → tunggu status berubah dari `PROVISIONING` → `RUNNING` (2-5 menit)

**Catat IP Public** yang muncul di halaman detail instance:
```
Public IP address: xxx.xxx.xxx.xxx  ← catat ini
```

---

## 3. Konfigurasi Firewall & Security

Oracle Cloud punya **2 lapis firewall**: Security List (cloud) dan UFW (OS). Keduanya harus dibuka.

### 3a. Oracle Security List (Cloud Firewall)

1. Di halaman Instance → klik nama **Subnet** di bagian Primary VNIC
2. Klik **Security List** yang ada
3. Klik **Add Ingress Rules** → tambahkan rule berikut:

| Source CIDR | Protocol | Port | Keterangan |
|-------------|----------|------|------------|
| `0.0.0.0/0` | TCP | `22` | SSH (sudah ada default) |
| `0.0.0.0/0` | TCP | `2358` | Judge0 API |

> Kalau nanti pakai Nginx/HTTPS, tambahkan port `80` dan `443` juga

Klik **Add Ingress Rules** untuk menyimpan.

### 3b. UFW akan dikonfigurasi di langkah 4 (setelah SSH masuk)

---

## 4. Setup Server (SSH)

### 4a. Koneksi SSH dari komputer lokal

**Linux / macOS / WSL:**
```bash
# Set permission key (wajib)
chmod 400 ~/Downloads/ssh-key-*.key

# Konek ke server
ssh -i ~/Downloads/ssh-key-*.key ubuntu@xxx.xxx.xxx.xxx
```

**Windows (PowerShell):**
```powershell
ssh -i C:\Users\YourName\Downloads\ssh-key-*.key ubuntu@xxx.xxx.xxx.xxx
```

Ketik `yes` saat ditanya fingerprint → kamu masuk ke server.

### 4b. Update sistem & buka firewall OS

```bash
# Update package list
sudo apt update && sudo apt upgrade -y

# Buka port di UFW (firewall OS)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 2358/tcp  # Judge0
sudo ufw --force enable

# Cek status
sudo ufw status
```

Output yang diharapkan:
```
Status: active
To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
2358/tcp                   ALLOW       Anywhere
```

---

## 5. Install Docker

```bash
# Install dependencies
sudo apt install -y ca-certificates curl gnupg

# Tambah Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Tambah Docker repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Tambah user ubuntu ke group docker (tidak perlu sudo tiap kali)
sudo usermod -aG docker ubuntu

# Reload grup (atau logout & login ulang)
newgrp docker

# Verifikasi
docker --version
docker compose version
```

Output yang diharapkan:
```
Docker version 26.x.x, build ...
Docker Compose version v2.x.x
```

---

## 6. Deploy Judge0

### 6a. Buat direktori & file konfigurasi

```bash
mkdir -p ~/judge0 && cd ~/judge0
```

### 6b. Buat file `docker-compose.yml`

```bash
nano docker-compose.yml
```

Copy-paste konfigurasi berikut, **ganti 4 nilai yang ditandai**:

```yaml
version: "3.9"

x-judge0-env: &judge0-env
  POSTGRES_HOST: db
  POSTGRES_PORT: "5432"
  POSTGRES_DB: judge0
  POSTGRES_USER: judge0
  POSTGRES_PASSWORD: "IsiPasswordDBKamu"        # ← GANTI
  REDIS_HOST: redis
  REDIS_PORT: "6379"
  REDIS_PASSWORD: "IsiPasswordRedisKamu"        # ← GANTI
  AUTHN_HEADER: "X-Auth-Token"
  AUTHN_TOKEN: "token-rahasia-untuk-api-kamu"   # ← GANTI (bebas, ingat ini)
  SECRET_KEY_BASE: "isiDenganStringAcak64Karakter0000000000000000000000000000000000"  # ← GANTI
  CPU_TIME_LIMIT: "5"
  CPU_EXTRA_TIME: "1"
  WALL_TIME_LIMIT: "10"
  MEMORY_LIMIT: "128000"
  STACK_LIMIT: "64000"
  MAX_PROCESSES_AND_OR_THREADS: "60"
  ENABLE_PER_PROCESS_AND_THREAD_MEMORY_LIMIT: "true"
  MAX_FILE_SIZE: "1024"

services:
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: judge0
      POSTGRES_USER: judge0
      POSTGRES_PASSWORD: "IsiPasswordDBKamu"    # ← GANTI (sama dengan atas)
    volumes:
      - judge0_db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U judge0"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    restart: unless-stopped
    command: >
      sh -c 'redis-server --requirepass "$$REDIS_PASSWORD" --appendonly no --save ""'
    environment:
      REDIS_PASSWORD: "IsiPasswordRedisKamu"    # ← GANTI (sama dengan atas)
    volumes:
      - judge0_redis:/data
    healthcheck:
      test: ["CMD", "redis-cli", "-a", "IsiPasswordRedisKamu", "ping"]  # ← GANTI
      interval: 10s
      timeout: 5s
      retries: 5

  server:
    image: judge0/judge0:1.13.1
    restart: unless-stopped
    environment:
      <<: *judge0-env
    ports:
      - "2358:2358"
    privileged: true
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  workers:
    image: judge0/judge0:1.13.1
    restart: unless-stopped
    command: ["./scripts/workers"]
    environment:
      <<: *judge0-env
    privileged: true
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

volumes:
  judge0_db:
  judge0_redis:
```

Simpan: `Ctrl+X` → `Y` → `Enter`

> **Tips generate SECRET_KEY_BASE** yang aman:
> ```bash
> openssl rand -hex 64
> ```
> Copy outputnya dan paste ke nilai `SECRET_KEY_BASE`.

### 6c. Jalankan Judge0

```bash
# Pull images dulu (butuh beberapa menit pertama kali)
docker compose pull

# Jalankan semua container
docker compose up -d

# Cek status container
docker compose ps
```

Output yang diharapkan (tunggu 30-60 detik sampai semua `healthy`):
```
NAME              STATUS
judge0-db-1       Up (healthy)
judge0-redis-1    Up (healthy)
judge0-server-1   Up
judge0-workers-1  Up
```

### 6d. Cek log kalau ada masalah

```bash
# Log semua container
docker compose logs -f

# Log server saja
docker compose logs -f server
```

---

## 7. Test & Verifikasi

### 7a. Test dari server (lokal)

```bash
# Cek system info
curl http://localhost:2358/system_info

# Test submit kode C++ (ganti YOUR_TOKEN dengan AUTHN_TOKEN yang kamu set)
curl -X POST http://localhost:2358/submissions \
  -H "Content-Type: application/json" \
  -H "X-Auth-Token: YOUR_TOKEN" \
  -d '{
    "source_code": "#include<iostream>\nint main(){std::cout<<\"Hello Judge0\";return 0;}",
    "language_id": 54
  }'
```

Response: JSON dengan `token` submission → catat tokennya.

```bash
# Ambil hasil (ganti TOKEN_SUBMISSION dengan token dari response atas)
curl http://localhost:2358/submissions/TOKEN_SUBMISSION \
  -H "X-Auth-Token: YOUR_TOKEN"
```

Response sukses:
```json
{
  "stdout": "Hello Judge0",
  "status": { "id": 3, "description": "Accepted" }
}
```

### 7b. Test dari komputer lokal (remote)

```bash
curl http://xxx.xxx.xxx.xxx:2358/system_info
```

Kalau muncul JSON system info → Judge0 sudah bisa diakses dari internet.

---

## 8. Update .env Project

Edit file `.env` di project `belajar-cpp`:

```env
# Self-hosted Judge0 di Oracle Cloud
JUDGE0_API_URL=http://xxx.xxx.xxx.xxx:2358
JUDGE0_API_KEY=token-rahasia-untuk-api-kamu

PUBLIC_SITE_URL=https://belajar-cpp.vercel.app
```

Ganti:
- `xxx.xxx.xxx.xxx` → IP Public Oracle VM kamu
- `token-rahasia-untuk-api-kamu` → nilai `AUTHN_TOKEN` yang kamu set di docker-compose

Untuk **Vercel deployment**, tambahkan environment variables di:
**Vercel Dashboard → Project → Settings → Environment Variables**

```
JUDGE0_API_URL  = http://xxx.xxx.xxx.xxx:2358
JUDGE0_API_KEY  = token-rahasia-untuk-api-kamu
```

---

## 9. Opsional: Domain + HTTPS

Kalau mau pakai domain (misal `judge0.domainmu.com`) dengan HTTPS:

### Opsi A — Cloudflare Tunnel (paling mudah, tidak perlu buka port 2358 ke publik)

```bash
# Install cloudflared di Oracle VPS
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64 \
  -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared

# Login ke Cloudflare
cloudflared tunnel login

# Buat tunnel
cloudflared tunnel create judge0

# Buat config
mkdir -p ~/.cloudflared
cat > ~/.cloudflared/config.yml << EOF
tunnel: <TUNNEL_ID>
credentials-file: /root/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: judge0.domainmu.com
    service: http://localhost:2358
  - service: http_status:404
EOF

# Tambah DNS record
cloudflared tunnel route dns judge0 judge0.domainmu.com

# Jalankan sebagai service
cloudflared service install
systemctl start cloudflared
```

Setelah ini, update `.env`:
```env
JUDGE0_API_URL=https://judge0.domainmu.com
JUDGE0_API_KEY=token-rahasia-untuk-api-kamu
```

### Opsi B — Nginx + Certbot (Let's Encrypt)

```bash
sudo apt install -y nginx certbot python3-certbot-nginx

# Buat config Nginx
sudo nano /etc/nginx/sites-available/judge0
```

```nginx
server {
    server_name judge0.domainmu.com;

    location / {
        proxy_pass http://localhost:2358;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/judge0 /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Generate SSL certificate
sudo certbot --nginx -d judge0.domainmu.com
```

---

## Troubleshooting

**Container tidak mau start:**
```bash
docker compose logs db      # cek error PostgreSQL
docker compose logs server  # cek error Judge0
```

**Port 2358 tidak bisa diakses dari luar:**
```bash
# Pastikan UFW membuka port
sudo ufw status

# Pastikan Security List Oracle sudah ditambah (langkah 3a)
# Cek apakah port listening
ss -tlnp | grep 2358
```

**Judge0 return 401 Unauthorized:**
```bash
# Pastikan header X-Auth-Token benar
curl -H "X-Auth-Token: YOUR_TOKEN" http://localhost:2358/system_info
```

**Workers tidak jalan / submission stuck "In Queue":**
```bash
docker compose restart workers
docker compose logs workers
```

**Restart semua container setelah reboot:**
```bash
# Semua container sudah set restart: unless-stopped
# Tapi kalau perlu manual:
cd ~/judge0 && docker compose up -d
```

---

## Ringkasan Konfigurasi .env

```env
# Setelah semua selesai, .env project kamu akan terlihat seperti ini:

# Pilih salah satu:

# Self-hosted (IP langsung)
JUDGE0_API_URL=http://xxx.xxx.xxx.xxx:2358
JUDGE0_API_KEY=token-rahasia-yang-kamu-set

# Self-hosted (dengan domain + HTTPS)
JUDGE0_API_URL=https://judge0.domainmu.com
JUDGE0_API_KEY=token-rahasia-yang-kamu-set

PUBLIC_SITE_URL=https://belajar-cpp.vercel.app
```

---

*Estimasi total waktu setup: 30-45 menit*
