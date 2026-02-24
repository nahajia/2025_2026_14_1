using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1
{
    class Szemely
    {
        public int az { get; set; }
        public string nev { get; set; }
        public int ev { get; set; }
        public string elozo { get; set; }

        public string azNev
        {
            get { return az + "-" + nev; }
        }
       
    }
}
