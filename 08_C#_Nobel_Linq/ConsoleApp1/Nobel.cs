using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Nobel
    {


        //év;típus;keresztnév;vezetéknév
        public int ev { get; set; }
        public string tipus { get; set; }
        public string knev { get; set; }
        public string vnev { get; set; }

        public Nobel(int ev, string tipus, string knev, string vnev)
        {
            this.ev = ev;
            this.tipus = tipus;
            this.knev = knev;
            this.vnev = vnev;
        }
    }
}
