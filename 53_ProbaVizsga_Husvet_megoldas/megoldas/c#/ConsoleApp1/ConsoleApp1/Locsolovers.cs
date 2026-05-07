using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class Locsolovers
    {
        public int locsolovers_id { get; set; }
        public string cim { get; set; }
        public string vers { get; set; }
        public int keletkezes_ev { get; set; }
        public double olvasasi_ido_perc { get; set; }
        public int kedvelesek_szama { get; set; }
        public int stilus_id { get; set; }
        public string stilus_nev { get; set; }
        

        public int VersSzokozNelkul {
            get
            {
                return vers.Where(x => x != ' ').Count();
            } 
        }
    }
}
