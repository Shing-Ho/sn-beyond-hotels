#!/bin/sh -eu
if [ -z "${REACT_APP_BASE_URL:-}" ]; then
    REACT_APP_BASE_URL=undefined
else
    REACT_APP_BASE_URL="$REACT_APP_BASE_URL"
fi
if [ -z "${REACT_APP_GOOGLE_MAP_KEY:-}" ]; then
    REACT_APP_GOOGLE_MAP_KEY=undefined
else
    REACT_APP_GOOGLE_MAP_KEY="$REACT_APP_GOOGLE_MAP_KEY"
fi
if [ -z "${BASE_ROUTE:-}" ]; then
    BASE_ROUTE=""
else
    BASE_ROUTE="/$BASE_ROUTE"
fi
 
cat <<EOF
window.REACT_APP_BASE_URL="$REACT_APP_BASE_URL";
window.REACT_APP_GOOGLE_MAP_KEY="$REACT_APP_GOOGLE_MAP_KEY";
window.BASE_ROUTE="$BASE_ROUTE";
EOF