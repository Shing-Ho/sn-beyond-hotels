#!/bin/sh -eu
[ -d "/usr/share/nginx/html/bookings" ] && ./generate_config_js.sh >/usr/share/nginx/html/bookings/config.js || ./generate_config_js.sh >/usr/share/nginx/html/config.js
nginx -g "daemon off;"