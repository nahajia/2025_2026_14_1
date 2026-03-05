using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WpfApp1
{
    class Versenyzo
    {
        public int id { get; set; }
        public string nev { get; set; }
        public string szakmaId { get; set; }
        public string orszagId { get; set; }
        public int pont { get; set; }

        public string NevesPont
        {
            get
            {
                return nev + "-"+ pont;
            }
        }
        public string OrszagNevPont
        {
            get
            {
                return orszagId + "-" + nev + "-" + pont;
            }
        }
    }
}
