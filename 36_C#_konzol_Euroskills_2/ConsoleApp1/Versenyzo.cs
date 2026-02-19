using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    public class Versenyzo
    {
        public int id { get; set; }

        public string nev { get; set; }
        public string szakmaId { get; set; }
        public string orszagId { get; set; }
        public int pont { get; set; }

        public bool kotojelKeres()
        {
            if (this.nev.Contains("-"))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool uresNeve
        {
            get
            {
                if (this.nev == "")
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

    }
}
