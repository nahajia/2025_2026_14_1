using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    // Interface-ek
    // csak definíciók vannak benne, mit tudjon csinálni, azt hogy hogyan, az nincs benne,
    //amikor implementáljuk, akkor adjuk meg a HOGYANT
    // implementácio jelentése: megvalósítás
    public interface IEszkoz
    {
        string Nev { get; }
        string Gyarto { get; }
        void Bekapcsol();
    }

    public interface IEnergia
    {
        void Kikapcsol();
        void AlvoMod();
    }

    // Absztrakt osztály Számítógép, amely implementál két interfészt 
    //öröklésnek tűnik, de implementálás
    public abstract class Szamitogep : IEszkoz, IEnergia
    {
        public string Nev { get; protected set; }
        public string Gyarto { get; protected set; }

        public Szamitogep(string nev, string gyarto)
        {
            Nev = nev;
            Gyarto = gyarto;
        }

        public virtual void Bekapcsol()
        {
            Console.WriteLine($"{Nev} bekapcsolva.");
        }

        public virtual void Kikapcsol()
        {
            Console.WriteLine($"{Nev} kikapcsolva.");
        }

        public virtual void AlvoMod()
        {
            Console.WriteLine($"{Nev} alvó módba lép.");
        }

        public virtual void Informacio()
        {
            Console.WriteLine($"Számítógép: {Nev}, Gyártó: {Gyarto}");
        }
    }

    // Absztrakt osztály Telefon
    public abstract class Telefon : IEszkoz, IEnergia
    {
        public string Nev { get; protected set; }
        public string Gyarto { get; protected set; }

        public Telefon(string nev, string gyarto)
        {
            Nev = nev;
            Gyarto = gyarto;
        }

        public virtual void Bekapcsol()
        {
            Console.WriteLine($"{Nev} be van kapcsolva.");
        }

        public virtual void Kikapcsol()
        {
            Console.WriteLine($"{Nev} ki van kapcsolva.");
        }

        public virtual void AlvoMod()
        {
            Console.WriteLine($"{Nev} alvó módba kapcsol.");
        }

        public virtual void Informacio()
        {
            Console.WriteLine($"Telefon: {Nev}, Gyártó: {Gyarto}");
        }
    }

    // Konkrét osztályok
    public class Laptop : Szamitogep
    {
        public Laptop(string nev, string gyarto) : base(nev, gyarto) { }

        public void KodotFordit()
        {
            Console.WriteLine($"{Nev} kódot fordít...");
        }
    }

    public class Okostelefon : Telefon
    {
        public Okostelefon(string nev, string gyarto) : base(nev, gyarto) { }

        public void HivasInditas(string szam)
        {
            Console.WriteLine($"{Nev} hívást indít: {szam}");
        }
    }
    public class AsztaliGep : Szamitogep
    {
        public AsztaliGep(string nev,string gyarto) : base(nev, gyarto)
        {
        }
        public void RajzolGrafikat()
        {
            Console.WriteLine($"{this.Nev} grafikai feladatokat végez...");
        }
    }

    // Main program
    class Program
    {
        static void Main()
        {
            Laptop laptop = new Laptop("ThinkPad X1", "Lenovo");
            Okostelefon telefon = new Okostelefon("iPhone 14", "Apple");
            AsztaliGep asztali = new AsztaliGep("Macintosh", "Apple");

            Console.WriteLine("Asztali");
            Console.WriteLine(asztali.Nev);
            asztali.RajzolGrafikat();
            asztali.Informacio();
            
            Console.WriteLine("-------------------------------------");
            laptop.Informacio();
            telefon.Informacio();
            Console.WriteLine("--------------------------------");
            // Lista létrehozása és hozzáadás Add-el
            List<IEszkoz> eszkozok = new List<IEszkoz>();
            eszkozok.Add(laptop);
            eszkozok.Add(telefon);
            eszkozok.Add(asztali);

            Console.WriteLine("=== Bekapcsolás és információ ===");
            foreach (var eszkoz in eszkozok)
            {
                eszkoz.Bekapcsol();
                Console.WriteLine($"{eszkoz.Nev} - {eszkoz.Gyarto}");
                
            }

            Console.WriteLine("\n=== Speciális funkciók ===");
            laptop.KodotFordit();
            telefon.HivasInditas("123-456-789");

            // Lista létrehozása IEnergia interface-re
            List<IEnergia> energiaEszkozok = new List<IEnergia>();
            energiaEszkozok.Add(laptop);
            energiaEszkozok.Add(telefon);
            energiaEszkozok.Add(asztali);

            Console.WriteLine("\n=== Alvó mód és kikapcsolás ===");
            foreach (var eszkoz in energiaEszkozok)
            {
                eszkoz.AlvoMod();
                eszkoz.Kikapcsol();
            }

            Console.ReadKey();
        }
    }




}
