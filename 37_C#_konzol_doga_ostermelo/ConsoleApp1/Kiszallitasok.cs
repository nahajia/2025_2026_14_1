using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    class Kiszallitasok
    {
        public int sorsz {get;set;}
        public int gyumleid {get;set;}
        public int partnerid {get;set;}
        public string datum {get;set;}
        public int karton {get;set;}
        public string feladat1()
        {
            if (karton==1)
            {
                return "egy";
            }
            else
            {
                return "több";
            }
        }
        public int honap
        {
            get
            {
                string[] kecske = datum.Split('-');
                return int.Parse(kecske[1]);
            }
        }




    }
}
