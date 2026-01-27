using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{

    // Alaposztály
    /*abstract*/
    class Allat
    {
        public string Nev { get; set; }

        public Allat(string nev)
        {
            Nev = nev;
        }

        // Közös metódus, amit minden állat használhat
        public void Eszik()
        {
            Console.WriteLine($"{Nev} eszik.");
        }

        // Virtuális metódus, amit az alosztályok felülírhatnak
        public virtual void HangotAd()
        {
            Console.WriteLine("Valamilyen általános állathang");
        }
    }

    // Kutya, származtatott osztály
    class Kutya : Allat
    {
        public string Fajta { get; set; }

        public Kutya(string nev, string fajta) : base(nev)
        {
            Fajta = fajta;
        }

        // Felülírt metódus
        public override void HangotAd()
        {
            Console.WriteLine("Vau! Vau!");
        }

        // Saját metódus
        public void IdeHoz()
        {
            Console.WriteLine($"{Nev} visszahozza a labdát!");
        }
    }

    // Macska, származtatott osztály
    class Macska : Allat
    {
        public bool Benti { get; set; }

        public Macska(string nev, bool benti) : base(nev)
        {
            Benti = benti;
        }

        // Felülírt metódus
        public override void HangotAd()
        {
            Console.WriteLine("Miau! Miau!");
        }

        // Saját metódus
        public void Kapar()
        {
            Console.WriteLine($"{Nev} kaparja a bútort!");
        }
    }

    // Madár, származtatott osztály
    class Madar : Allat
    {
        public double Szarnytavolsag { get; set; }

        public Madar(string nev, double szarnytavolsag) : base(nev)
        {
            Szarnytavolsag = szarnytavolsag;
        }

        // Felülírt metódus
        public override void HangotAd()
        {
            Console.WriteLine("Csip! Csip!");
        }

        // Saját metódus
        public void Repul()
        {
            Console.WriteLine($"{Nev} repül, szárnyfesztávolsága {Szarnytavolsag} méter!");
        }
    }
    class Tengerimalac : Allat
    {
        public bool Felos { get; set; }
        public Tengerimalac(string nev,bool felos) : base(nev)
        {
            this.Felos = felos;
        }
        public override void HangotAd()
        {
            //base.HangotAd();
            Console.WriteLine("Viiiiiiii viiiiiiii");
        }
        public void elBujik()
        {
            if (this.Felos)
            {
                Console.WriteLine($"{this.Nev} elbújik a bútorok alá és meg se mozdul.");
            }
            else
            {
                Console.WriteLine($"{this.Nev} elbújik, de néha bátran kinéz.");
            }
        }
    }


    class Program
    {
        static void Main()
        {
            //Allat enTigrisem = new Allat("Karmos");
            Kutya enKutyam = new Kutya("Bodri", "Golden Retriever");
            Macska enMacskam = new Macska("Cirmos", true);
            Madar enMadarom = new Madar("Csipi", 0.5);

            enKutyam.Eszik();
            enKutyam.HangotAd();
            enKutyam.IdeHoz();

            enMacskam.Eszik();
            enMacskam.HangotAd();
            enMacskam.Kapar();

            enMadarom.Eszik();
            enMadarom.HangotAd();
            enMadarom.Repul();

            //Tengerimalac adatai
            Tengerimalac enMalacom = new Tengerimalac("Gombóc", true);
            Console.WriteLine($"A tengerimalac neve : {enMalacom.Nev}");
            if (enMalacom.Felos)
            {
                Console.WriteLine($"{enMalacom.Nev} nagyon félős.");
            }
            else
            {
                Console.WriteLine($"{enMalacom.Nev} NEM félős.");
            }
            enMalacom.HangotAd();
            enMalacom.elBujik();

            Console.ReadKey();
        }
    }

}
