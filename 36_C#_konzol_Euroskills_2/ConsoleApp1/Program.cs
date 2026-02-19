using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetworkHelper;
using System.IO;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Versenyzo> tomb = Backend.GET("http://localhost:3000/versenyzo").Send().As<List<Versenyzo>>();
            //Console.WriteLine(tomb[0].nev);
            //Console.WriteLine(tomb[0].kotojelKeres());
            //Console.WriteLine(tomb[0].uresNeve);
            /*
            //5
            var eredmeny5 = tomb.Where(x => x.pont > 700).Count();
            Console.WriteLine($"700 pont felettiek száma: {eredmeny5} ");

            //6
            Console.Write("Adj meg egy alsó határt:");
            int beAlso = int.Parse(Console.ReadLine());
            Console.Write("Adj meg egy felső határt:");
            int beFelso = int.Parse(Console.ReadLine());

            var eredmeny6 = tomb.Where(x => x.pont > beAlso && x.pont < beFelso);
            foreach (var item in eredmeny6)
            {
                Console.WriteLine($"Neve: {item.nev} pontja: {item.pont}");
            }

            //7
            var eredmeny7 = tomb.Max(x => x.pont);
            Console.WriteLine("Legnagyobb pont:"+ eredmeny7);
            var eredmeny77 = tomb.Where(x => x.pont == eredmeny7);
            foreach (var item in eredmeny77)
            {
                Console.WriteLine($"Legnagyobb pontot elért: {item.nev}");
            }


            //8
            var eredmeny8 = tomb.Where(x => x.orszagId == "HU").Average(x=> x.pont);
            Console.WriteLine($"Magyarok átlagpontja: {eredmeny8}");

            //9
            var eredmeny9 = tomb.GroupBy(x => x.orszagId);
            foreach (var item in eredmeny9)
            {
                Console.WriteLine($"Ország kódja: {item.Key} db:{item.Count()}");
            }

            //10
            var eredmeny10 = eredmeny9.OrderBy(x => x.Key);
            foreach (var item in eredmeny10)
            {
                Console.WriteLine($"Ország kódja: {item.Key} db:{item.Count()}");
            }

            //11
            var eredmeny11 = eredmeny9.OrderByDescending(x => x.Count());
            foreach (var item in eredmeny11)
            {
                Console.WriteLine($"Ország kódja: {item.Key} db:{item.Count()}");
            }

            //12
            Console.Write("Adj meg egy országkódot:");
            string beOrszag = Console.ReadLine();
            var eredmeny12 = tomb.Where(x => x.orszagId == beOrszag);
            List<string> kimenet = new List<string>();
            foreach (var item in eredmeny12)
            {
                kimenet.Add($"Név:{item.nev}  pont:{item.pont}");
            }
            File.WriteAllLines(beOrszag +".txt", kimenet);
            */
            var Feladat1 = tomb.GroupBy(x => x.szakmaId).OrderByDescending(x=> x.Count());
            foreach (var item in Feladat1)
            {
                Console.WriteLine($" szakmaid: {item.Key} : {item.Count()}");
            }

            var Feladat2 = tomb.GroupBy(x => x.orszagId).OrderBy(x=> x.Key);
            foreach (var item in Feladat2)
            {
                Console.WriteLine($"{item.Key} : {item.Max(x=> x.pont)}");
            }

            var Feladat3 = tomb.GroupBy(x => x.orszagId).OrderByDescending(x=> x.Average(y=> y.pont));
            Console.WriteLine($"3. feladat:");
            foreach (var item in Feladat3)
            {
                Console.WriteLine($"{item.Key} : {item.Average(x=> x.pont):f2}");
            }

            Console.Write($"Adj meg kérlek egy szót, vagy betűt: ");
            string beKer = Console.ReadLine();
            List<string> kimenet = new List<string>();
            var Feladat4 = tomb.Where(x => x.nev.ToLower().Contains(beKer.ToLower()) || x.orszagId.ToLower().Contains(beKer.ToLower()));
            foreach (var item in Feladat4)
            {
                kimenet.Add($"{item.nev} : {item.orszagId}");
            }
            kimenet.Add($"Találatok száma: {Feladat4.Count()}");
            File.WriteAllLines("keresett.txt", kimenet);
            Console.ReadKey();
        }
    }
}
