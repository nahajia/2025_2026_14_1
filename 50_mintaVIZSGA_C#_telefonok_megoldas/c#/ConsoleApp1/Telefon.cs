using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class Telefon
    {
        public int telefon_id { get; set; }
        public int marka_id { get; set; }
        public string modell { get; set; }
        public string leiras { get; set; }
        public int uj_ar { get; set; }
        public int hasznalt_ar { get; set; }
        public double kijelzo_merete { get; set; }
        public int okostelefon { get; set; }

        public string marka_nev { get; set; }

        public string kimenet
        {
            get
            {
                return $"{modell} ({kijelzo_merete}): {uj_ar} FT";
            }
        } 

        public int SzokozNelkul
        {
            get
            {
                int db = 0;
                foreach (var item in leiras)
                {
                    if(item !=' ')
                    {
                        db++;
                    }
                }
                return db;
            }
        }
        public int SzokozNelkul2
        {
            get
            {
                return leiras.Where(x => x != ' ').Count();
            }
        }
        public int SzokozNelkul3
        {
            get
            {
                return leiras.Count(x => x != ' ');
            }
        }
    }
}
