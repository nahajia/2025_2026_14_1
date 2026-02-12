using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Hirdetes
    {

        //SELECT `id`, `ingatlanid`, `ar`, `allapot`, `datum` FROM `hirdetes` WHERE 1
        public int id { get; set; }
        public int ingatlanid { get; set; }
        public double ar { get; set; }
        public string allapot { get; set; }
        public string datum { get; set; }


        public string Kategoria()
        {
            if (this.ar>100)
            {
                return "drága";
            }
            else if (this.ar>10)
            {
                return "közepes";
            }
            return "olcsó";
        }
        public string Datumformatum
        {
            get
            {
                string[] kecske = this.datum.Split('T');
                return kecske[0];
            }
        }
        public string HonapNeve
        {
            get
            {
                string[] kecske = this.datum.Split('T');
                string[] szocske = kecske[0].Split('-');
                int honap = int.Parse(szocske[1]);
                switch (honap)
                {
                    case 1:
                        return "Január";
                    case 2:
                        return "Február";
                    case 3:
                        return "Március";
                    case 4:
                        return "Április";
                    case 5:
                        return "Május";
                    case 6:
                        return "Június";
                    case 7:
                        return "Július";
                    case 8:
                        return "Augusztus";
                    case 9:
                        return "Szeptember";
                    case 10:
                        return "Október";
                    case 11:
                        return "November";
                    case 12:
                        return "December";
                    default:
                        return "";
                }
                
            }
        }
        public string hoNev
        {
            get
            {
                string[] kecske = this.datum.Split('T');
                string[] szocske = kecske[0].Split('-');
                int ho = Convert.ToInt32(szocske[1]);
                string[] hoTomb = { "Jan", "Feb", "Mar", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec" };
                return hoTomb[ho-1];
            }
        }
    }
}
