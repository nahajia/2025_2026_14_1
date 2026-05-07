using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetworkHelper;

namespace ConsoleApp1
{
    public class Program
    {

        public static List<Locsolovers> locsoloversek = new List<Locsolovers>();
        static void Main(string[] args)
        {
            locsoloversek = Backend.GET("http://localhost:3000/locsoloversek").Send().As<List<Locsolovers>>();

            //1.feladat
            Console.WriteLine("1. feladat: Új locsolóversek:");
            var feladat1 = locsoloversek.Where(x => x.keletkezes_ev == 2026).OrderBy(x => x.cim);

            foreach (var vers in feladat1)
            {
                Console.WriteLine($"\t- {vers.cim}: {vers.vers}");
            }

            //2.feladat
            Console.WriteLine("\n2. feladat: Évenkénti locsolóversek száma:");
            var feladat2 = locsoloversek.GroupBy(x => x.keletkezes_ev).OrderByDescending(y => y.Key);

            foreach (var vers in feladat2) Console.WriteLine($"\t{vers.Key}. évi locsolóversek: {vers.Count()}db");

            //3.feladat
            Console.WriteLine("\n3. feladat: Keresés");
            Console.Write("Add meg a címben vagy versben keresendő szót: ");
            string keresendo = Console.ReadLine();

            var keresettVersek = locsoloversek.Where(x => x.cim.ToLower().Contains(keresendo.ToLower()) || x.vers.ToLower().Contains(keresendo.ToLower()));

            if (keresettVersek.Count() == 0) Console.WriteLine("Nincs találat!");
            else
            {
                Console.WriteLine($"{keresettVersek.Count()} találat van:");
                foreach (var vers in keresettVersek)
                {
                    Console.WriteLine($"\tCím: {vers.cim}\n\tKedvelések száma: {vers.kedvelesek_szama}\n\tVers: {vers.vers}");
                    Console.WriteLine("\t------------------------------------------");
                }
            }
            





            Console.ReadKey();
        }
    }
}
