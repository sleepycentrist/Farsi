import json
from pathlib import Path


questions_path = Path(__file__).parent.parent / "questions.json"

with questions_path.open(encoding="utf-8") as file:
    vocabulary = json.load(file)


known_persian = {}

for entry in vocabulary:
    if entry.get("persian"):
        english_key = entry["english"].strip().casefold()
        known_persian[english_key] = entry["persian"]

manual_persian = {
    "pasfardâ": "پس‌فردا",
    "bâlâ-ye": "بالای",
    "ru-ye": "روی",
    "zir-e": "زیر",
    "pâyin-e": "پایین",
    "jelo-ye": "جلوی",
    "ruberu-ye": "روبه‌روی",
    "posht-e": "پشت",
    "dâkhel-e / darun-e": "داخل / درون",
    "birun-e": "بیرون",
    "beyn-e": "بین",
    "nazdik-e": "نزدیک",
    "dur az": "دور از",
    "shomâl / shomâli": "شمال / شمالی",
    "jonub / jonubi": "جنوب / جنوبی",
    "gharb / gharbi": "غرب / غربی",
    "shargh / sharghi": "شرق / شرقی",
    "shomâl-e gharb / shomâl-e shargh": "شمال غرب / شمال شرق",
    "jonub-e gharb / jonub-e shargh": "جنوب غرب / جنوب شرق",
    "râst / chap": "راست / چپ",
    "markaz / samt": "مرکز / سمت",
    "injâ / ânjâ": "اینجا / آنجا",
    "khoshmaze": "خوشمزه",
    "mipazam": "می‌پزم",
    "kutâh": "کوتاه",
    "kutâh kardan": "کوتاه کردن",
    "boland": "بلند",
    "mu": "مو",
    "muhâm": "موهام",
    "muhâmo": "موهامو",
    "me’mâr": "معمار",
    "tarrâhi kardan": "طراحی کردن",
    "kâmion": "کامیون",
    "rânande-ye kâmion": "رانندهٔ کامیون",
    "bannâ": "بنا",
    "rânandegi kardan": "رانندگی کردن",
    "komak kardan": "کمک کردن",
    "parastâr-e bache": "پرستار بچه",
    "negahdâri": "نگهداری",
    "dustâm": "دوستام"
}

updated_count = 0
for entry in vocabulary:
    if not entry.get("persian"):
        farsi_key = entry["farsi"]
        english_key = entry["english"].strip().casefold()

        if farsi_key in manual_persian:
            entry["persian"] = manual_persian[farsi_key]
            updated_count += 1

            print(
                "Added:",
                entry["farsi"],
                "→",
                entry["persian"]
            )

        elif english_key in known_persian:
            entry["persian"] = known_persian[english_key]
            updated_count += 1

            print(
                "Copied:",
                entry["farsi"],
                "→",
                entry["persian"]
            )


with questions_path.open("w", encoding="utf-8") as file:
    json.dump(
        vocabulary,
        file,
        ensure_ascii=False,
        indent=2
    )

    file.write("\n")


print(f"Updated {updated_count} entries.")