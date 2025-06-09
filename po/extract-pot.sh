#!/bin/bash

# This goes through all of our quizzes and extract strings to potfiles.
# So users don't have to enter manually questions twice

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
DATA_DIR="$SCRIPT_DIR/../data"
SRC_DIR="$SCRIPT_DIR/../src"
OUT_DIR="$SCRIPT_DIR"
FINAL_POT_FILE="$OUT_DIR/template.pot" # Was MASTER_POT
TEMP_GENERATED_POT="$OUT_DIR/template.pot.generating" # New variable

if ! command -v msgcat >/dev/null 2>&1 || ! command -v msguniq >/dev/null 2>&1 || ! command -v xgettext >/dev/null 2>&1; then
  echo "Error: Required tools (msgcat, msguniq, xgettext) from gettext-tools are missing." >&2
  exit 1
fi

# Start with an empty pot file
: > "$TEMP_GENERATED_POT" # Was MASTER_POT

# Loop over all relevant JS source files
for jsfile in "$DATA_DIR"/*.js "$SRC_DIR"/i18nHelpers.js "$SRC_DIR"/consts.js; do
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
    # Merge individual pot into the temporary accumulating pot file
    msgcat --use-first --no-wrap "$TEMP_GENERATED_POT" "$potfile" | msguniq --no-wrap > "$TEMP_GENERATED_POT.new" # Was MASTER_POT
    mv "$TEMP_GENERATED_POT.new" "$TEMP_GENERATED_POT" # Was MASTER_POT
    rm "$potfile"
done

# After the loop, TEMP_GENERATED_POT contains the complete new POT content.
# Compare TEMP_GENERATED_POT with FINAL_POT_FILE to see if an update is needed.

if [ ! -f "$FINAL_POT_FILE" ]; then
    # FINAL_POT_FILE does not exist, so move the generated one
    echo "Creating $FINAL_POT_FILE."
    mv "$TEMP_GENERATED_POT" "$FINAL_POT_FILE"
else
    # FINAL_POT_FILE exists, compare content ignoring POT-Creation-Date
    EXISTING_POT_NO_DATE_TMP=$(mktemp)
    GENERATED_POT_NO_DATE_TMP=$(mktemp)

    # Grep for lines NOT containing POT-Creation-Date.
    # The '|| true' ensures the command succeeds even if grep finds no non-matching lines (empty output)
    # or if the input file is empty.
    grep -v '^"POT-Creation-Date: ' "$FINAL_POT_FILE" > "$EXISTING_POT_NO_DATE_TMP" || true
    grep -v '^"POT-Creation-Date: ' "$TEMP_GENERATED_POT" > "$GENERATED_POT_NO_DATE_TMP" || true

    # Compare the files without the date line
    if cmp -s "$EXISTING_POT_NO_DATE_TMP" "$GENERATED_POT_NO_DATE_TMP"; then
        echo "No actual changes to $FINAL_POT_FILE (ignoring POT-Creation-Date)."
        rm "$TEMP_GENERATED_POT" # Discard the generated one as it's the same (sans date)
    else
        echo "$FINAL_POT_FILE has changed, updating."
        mv "$TEMP_GENERATED_POT" "$FINAL_POT_FILE" # Overwrite with the new one
    fi

    # Clean up temporary files used for comparison
    rm "$EXISTING_POT_NO_DATE_TMP" "$GENERATED_POT_NO_DATE_TMP"
fi
