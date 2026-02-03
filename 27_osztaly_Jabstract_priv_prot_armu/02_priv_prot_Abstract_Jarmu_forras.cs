using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    abstract class Jarmu
    {
        private int uzemanyag;//csak ebben az osztályban érhető el
        protected int Sebesseg { get; private set; } //ebben az osztályban és a származtatott osztályban érhető el
        public string Rendszam { get; }

        protected Jarmu(string rendszam, int kezdoUzemanyag)
        {
            Rendszam = rendszam;
            uzemanyag = kezdoUzemanyag;
            Sebesseg = 0;
        }

        public void Tankol(int liter)
        {
            if (liter <= 0)
            {
                Console.WriteLine("A tankolt mennyiség pozitív kell legyen. Tankolás elmaradt.");
                return; // kilép a metódusból
            }

            uzemanyag += liter;
        }

        public int UzemanyagSzint()
        {
            return uzemanyag;
        }


        protected void SebessegNovel(int ertek)
        {
            if (ertek <= 0)
                return;

            Sebesseg += ertek;
            uzemanyag -= ertek / 2; // fogyasztás szimulálása
        }


        public abstract void Gyorsit();//az ebből származtatott osztályban kötelező felülírni

        public virtual void KiirAllapot()//van alapértelmezett implementáció, de a leszármazott tetszőlegesen felülírhatja(override).
        {
            Console.WriteLine($"Rendszám: {Rendszam}");
            Console.WriteLine($"Sebesség: {Sebesseg} km/h");
            Console.WriteLine($"Üzemanyag: {uzemanyag} liter");
        }
    }
    class Auto : Jarmu
    {
        public Auto(string rendszam)
            : base(rendszam, 50)
        {
        }

        public override void Gyorsit()
        {
            SebessegNovel(10);
        }

        public override void KiirAllapot()
        {
            base.KiirAllapot();
            Console.WriteLine("Típus: Autó");
        }
    }
    

    class Program
    {
        static void Main()
        {
            Auto ujAuto1 = new Auto("ABC-123");
            ujAuto1.KiirAllapot();
            ujAuto1.Gyorsit();
            ujAuto1.KiirAllapot();

            

            Console.ReadKey();
        }
    }

}
