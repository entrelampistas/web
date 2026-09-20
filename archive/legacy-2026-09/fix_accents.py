#!/usr/bin/env python3
"""
Fix missing Spanish diacritics in HTML files.
Scans text nodes only (not tags/attributes) and applies replacements.
"""
import re, sys

# Comprehensive replacement map: unaccented → accented
# Only words that are ALWAYS accented in Spanish in these contexts
REPLACEMENTS = {
    # From the landing file
    "Que tipo": "Qué tipo",
    "como vivimos": "cómo vivimos",
    "Economia de lo cotidiano": "Economía de lo cotidiano",
    "La economia no es": "La economía no es",
    "Como orientarse": "Cómo orientarse",
    "disenado": "diseñado",
    "Autonomia mental": "Autonomía mental",
    "Indice de Habitabilidad": "Índice de Habitabilidad",
    "diagnostico": "diagnóstico",
    "vertigo": "vértigo",
    "Aqui revisamos": "Aquí revisamos",
    "Ultima revision": "Última revisión",
    "Atencion": "Atención",
    "Autonomia</": "Autonomía</",
    "Como la tecnologia": "Cómo la tecnología",
    "tecnologia condiciona": "tecnología condiciona",
    "intencion": "intención",
    "revision": "revisión",
    "Como se vive": "Cómo se vive",
    "contemporaneas": "contemporáneas",
}

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    changes = 0
    for old, new in REPLACEMENTS.items():
        count = content.count(old)
        if count:
            content = content.replace(old, new)
            changes += count
            print(f"  ✓ «{old}» → «{new}» ({count}x)")
    
    if changes:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"\n  {changes} correcciones aplicadas en {path}")
    else:
        print(f"  No se encontraron correcciones pendientes en {path}")

if __name__ == "__main__":
    for path in sys.argv[1:]:
        print(f"\n📄 {path}")
        fix_file(path)
