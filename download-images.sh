#!/bin/sh
# toUnknown — download all site images into ./images/
# Run:  cd ~/Desktop/toUnknown.Com && sh download-images.sh
set -e
mkdir -p images
dl() { echo "↓ $2"; curl -sL --fail -o "images/$2" "$1" || echo "  ! failed: $2"; }

dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/d95DMJoWQZi9KZO2/dod1-2dud-d-d2dunnd1-2d3-4d1-4n-Aq2eB6DL6VSjnbXR.png" "logo.png"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=155,fit=crop/d95DMJoWQZi9KZO2/logo-copy-YbNnaZVgpyCnog3e.png" "wordmark.png"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/d95DMJoWQZi9KZO2/tounknowndotcom-mePvblBa96ugbge1.jpg" "brand-hero.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/d95DMJoWQZi9KZO2/vipassana-meditation-mjEPpWR2lWHvRnVz.jpg" "hero-vipassana.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/d95DMJoWQZi9KZO2/112-meditation-techniques-of-vigyan-bhairav-tantra-vijniana-bhairava-tantra-mv058VBbxxHle1ZR.jpg" "tantra-112-cover.jpg"
dl "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1749811476032-covercopy.jpg" "tantra-cover-alt.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/d95DMJoWQZi9KZO2/vipassana-meditation-course-part-1---anapanasati-online-A1aw3ookEphPVrPR.jpg" "vipassana-part1.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/d95DMJoWQZi9KZO2/cover-food-detox-edition-dOqyPagbKlIjMrE0.jpg" "food-detox.jpg"
dl "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1750926107990-covercopy.jpg" "himalayan-silence.jpg"
dl "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W%2Fassets%2F1751001777618-cover_copy_n6ztvgd.jpg" "whispers-of-god.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=789,fit=crop/d95DMJoWQZi9KZO2/shiva-meditation-online-A85Vy47MEOF7lOJL.jpg" "shiva-meditation.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=480,fit=crop/d95DMJoWQZi9KZO2/shiva-meditation-online.jpg-AVLaXbnNlDUDGxkO.jpg" "shiva-meditation-2.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=768,fit=crop/d95DMJoWQZi9KZO2/true-meditation-AzGjpnnRKjCvn38p.jpg" "true-meditation.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=583,fit=crop/d95DMJoWQZi9KZO2/tounknown.com-YX41rpojaNUDwELy.png" "masterpiece.png"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1440,h=756,fit=crop,f=jpeg/d95DMJoWQZi9KZO2/dana-m5Kn67gab6IJl6G1.jpg" "dana.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=466,fit=crop/d95DMJoWQZi9KZO2/dyn-A3QlQeJvnpinw4Vv.jpg" "dyn-portrait.jpg"
dl "https://cdn.zyrosite.com/cdn-cgi/image/format=auto,fit=crop,q=80,w=768/cdn-ecommerce/store_01HBM37W59YM602ZY1SMAMN37W/assets/958fa256-7a1d-4425-9c18-62e57f830a83.jpg" "community-banner.jpg"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=61,fit=crop/d95DMJoWQZi9KZO2/trustpilot-vipassana.life-95flksHt92UTTjoa.png" "trustpilot.png"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=1658,fit=crop/d95DMJoWQZi9KZO2/screenshot-2023-08-24-at-05.45.26-mv05xRzBLriVQ5bO.png" "site-screenshot-1.png"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1920,fit=crop/d95DMJoWQZi9KZO2/screenshot-2023-09-18-at-02.49.28-Awvjw7VK64SpBQrX.png" "site-screenshot-2.png"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=646,fit=crop/d95DMJoWQZi9KZO2/upload-680eba7c-8df2-4c1c-836a-076a5f180cf3-YanJpjaRXGcEDxny.webp" "dana-page-1.webp"
dl "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=341,fit=crop/d95DMJoWQZi9KZO2/upload-03655607-3d04-423f-b727-056bc03ce24b-mjEGpWD6W7F98L7Y.webp" "dana-page-2.webp"

echo ""
echo "✓ Done. $(ls images | wc -l | tr -d ' ') images in ./images/"
