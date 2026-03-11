using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1
{
    class uralkodo
    {
        public int azon { get; set; }
        public string nev { get; set; }
        public string ragnev { get; set; }
        public int szul { get; set; }
        public int hal { get; set; }
        public int uhaz_az { get; set; }

        public string nevSzulHal
        {
            get
            {
                return nev + "-" + szul + "-" + hal;
            }

        }

        public string nevSzulHalHaz
        {
            get
            {
                return nev + "-" + szul + "-" + hal+"-"+uhaz_az;
            }
        }
    }
}
