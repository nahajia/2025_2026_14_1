using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Szemely
    {
        public int az { get; set; }
        public string nev { get; set; }
        public int ev { get; set; }
        public string elozo { get; set; }

        public int szoSzamol()
        {
            string[] kecske = nev.Split(' ');
            
            return kecske.Length;
        }

        public bool vanE
        {
            get
            {
                if (elozo!="")
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
