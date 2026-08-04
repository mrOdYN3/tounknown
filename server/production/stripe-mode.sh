#!/bin/sh
# Switch the payment mode.   Usage:  /root/stripe-mode.sh test|live|status
case "$1" in
  test) cp /opt/tu-api/env /opt/tu-api/env.live 2>/dev/null
        cp /opt/tu-api/env.test /opt/tu-api/env
        systemctl restart tu-api; echo "→ TEST mode (no real money)";;
  live) [ -f /opt/tu-api/env.live ] && cp /opt/tu-api/env.live /opt/tu-api/env
        systemctl restart tu-api; echo "→ LIVE mode (real charges)";;
  *)    grep -o "sk_[a-z]*" /opt/tu-api/env | sed "s/^/current mode: /";;
esac
