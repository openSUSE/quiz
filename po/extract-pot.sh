#!/bin/bash

# This goes through all of our quizzes and extract strings to potfiles.
# So users don't have to enter manually questions twice

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
DATA_DIR="$SCRIPT_DIR/../data"
SRC_DIR="$SCRIPT_DIR/../src"
OUT_DIR="$SCRIPT_DIR"
MASTER_POT="$OUT_DIR/template.pot"

if ! command -v msgcat >/dev/null 2>&1; then
  echo "Required tools (msgcat, msguniq, xgettext) are missing."
  echo "Please install the 'gettext-tools' package."
  exit 1
fi

# Start with an empty pot file
: > "$MASTER_POT"

# Loop over all relevant JS source files
for jsfile in "$DATA_DIR"/*.js "$SRC_DIR"/i18nHelpers.js; do
    name=$(basename "${jsfile%.js}") # Strip .js suffix
    potfile="$OUT_DIR/$name.pot"

    xgettext \
        --language=JavaScript \
        --from-code=UTF-8 \
        --no-wrap \
        --no-location \
        -k_ \
        -o "$potfile" "$jsfile"

    # Merge into master pot (preserve first translation, remove duplicates)
    msgcat --use-first --no-wrap "$MASTER_POT" "$potfile" | msguniq --no-wrap > "$MASTER_POT.new"
    mv "$MASTER_POT.new" "$MASTER_POT"
    rm "$potfile"
done
