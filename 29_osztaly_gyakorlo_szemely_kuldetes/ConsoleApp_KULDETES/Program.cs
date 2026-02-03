using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp_KULDETES
{
    interface IKuldetes
    {
        string Nev { get; set; }
         bool Teljesit();

    }
    class HarcKuldetes : IKuldetes
    {
        public string Nev { get; set; }
        public HarcKuldetes(string Nev)
        {
            this.Nev = Nev;
        }
        public bool Teljesit()
        {
            Console.WriteLine($"A küldetés a követekező:{this.Nev}");
            Console.WriteLine("Küldetés teljestve");
            return true;
        }
    }
    class MentoKuldetes: IKuldetes
    {
        public string Nev { get; set; }
        public MentoKuldetes(string Nev)
        {
            this.Nev = Nev;
        }
        public bool Teljesit()
        {
            Console.WriteLine($"A küldetés:{this.Nev} TELJESITVE");
            return true;
        }
    }






    class Program
    {
        static void Main(string[] args)
        {
            HarcKuldetes harc1 = new HarcKuldetes("Legyőzni a trollt");
            harc1.Teljesit();
            MentoKuldetes mento1 = new MentoKuldetes("Megmenteni Frodót");
            mento1.Teljesit();
            Console.ReadKey();

        }
    }
}
