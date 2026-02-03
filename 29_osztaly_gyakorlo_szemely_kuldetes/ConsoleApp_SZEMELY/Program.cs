using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp_SZEMELY
{
    class Szemely
    {
        private string nev;
        protected int eletkor;

        public Szemely(string nev,int eletkor)
        {
            this.nev = nev;
            this.eletkor = eletkor;
        }
        public virtual void Bemutatkozas()
        {
            Console.WriteLine($"A nevem {nev} életkorom {eletkor}");
        }
        public virtual void Munkakedv()
        {
            Console.WriteLine("Normál munkakedvem van! várom a fizut");
        }
    }
    class Dolgozo : Szemely
    {
        private string munkakor;

        public Dolgozo(string munkakor,string nev,int eletkor): base (nev,eletkor)
        {
            this.munkakor = munkakor;
        }
        public override void Bemutatkozas()
        {
            base.Bemutatkozas();
            Console.WriteLine($"Munkaköröm {this.munkakor}");
        }
        public override void Munkakedv()
        {
            Console.WriteLine("Nagyon szeretem a munkámat ha rendesen megfizetnének!");
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            Szemely szemely1 = new Szemely("Dániel",24);
            Szemely szemely2 = new Szemely("Gergő",22);
            Dolgozo dolgozo1 = new Dolgozo("Segédmunkás","Lakatos Diégó",32);
            Dolgozo dolgozo2 = new Dolgozo("Takaritó", "Dzsenifer", 22);
            /*szemely1.Bemutatkozas();
            szemely1.Munkakedv();
            szemely2.Bemutatkozas();
            szemely2.Munkakedv();
            dolgozo1.Bemutatkozas();
            dolgozo1.Munkakedv();*/
            List<Szemely> szemelylista = new List<Szemely>();
            szemelylista.Add(szemely1);
            szemelylista.Add(szemely2);
            szemelylista.Add(dolgozo1);
            szemelylista.Add(dolgozo2);
            foreach (var elem in szemelylista)
            {
                elem.Bemutatkozas();
                elem.Munkakedv();
                Console.WriteLine("-------------");
            }
            Console.ReadKey();
        }
    }
}
