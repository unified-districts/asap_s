if [ $# -eq 0 ]
then
  echo "Please provide an argument."
  exit 2
else
  echo "Replacing…"
fi

find . -type f -name "*.php"     -exec sed -i '' "s/\'asap_s\'/\'$1\'/g" {} +
find . -type f -name "*.php"     -exec sed -i '' "s/asap_s_/$1_/g" {} +
find . -type f -name "*.php"     -exec sed -i '' "s/ asap_s/ $1/g" {} +
find . -type f -name "*.php"     -exec sed -i '' "s/asap_s-/$1-/g" {} +
find . -type f -name "*.css"     -exec sed -i '' "s/asap_s/$1/g" {} +
find . -type f -name "style.css" -exec sed -i '' "s/Text Domain: asap_s/Text Domain: $1/g" {} +

wait
echo "String replacements complete"
