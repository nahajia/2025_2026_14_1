using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace ConsoleApp1
{
    class Nobel
    {
        /*év;típus;keresztnév;vezetéknév
2017;fizikai;Rainer;Weiss*/
        public int ev { get; set; }
        public string tipus { get; set; }
        public string knev { get; set; }
        public string vnev { get; set; }

        public Nobel(int ev, string tipus, string knev, string vnev)
        {
            this.ev = ev;
            this.tipus = tipus;
            this.knev = knev;
            this.vnev = vnev;
        }

        public Nobel(string sor)
        {
            string[] kecske = sor.Split(';');
            this.ev = int.Parse(kecske[0]);
            this.tipus = kecske[1];
            this.knev = kecske[2];
            this.vnev = kecske[3];
        }

    }
    class Program
    {
        static void Main(string[] args)
        {

            string[] fajl = File.ReadAllLines("nobel.csv",Encoding.UTF8);
            List<Nobel> nobelLista = new List<Nobel>();
            foreach (var elem in fajl.Skip(1))
            {
                //Console.WriteLine(elem);
                //1.konstruktor
                //string[] kecske = elem.Split(';');
                //nobelLista.Add(new Nobel(int.Parse(kecske[0]), kecske[1], kecske[2], kecske[3]));
                //2.konstruktor
                nobelLista.Add(new Nobel(elem));
            }
            //Console.WriteLine($"Nobel díjasok száma:{nobelLista.Count}");
            //3.Feladat
            foreach (var elem in nobelLista)
            {
                if (elem.knev== "Arthur B." && elem.vnev=="McDonald")
                {
                    Console.WriteLine($"3.Feladat:{elem.tipus}");
                    break;
                }
            }
            //4.Feladat
            Console.Write("4.Feladat:");
            foreach (var elem in nobelLista)
            {
                if (elem.ev==2017 && elem.tipus== "irodalmi")
                {
                    Console.WriteLine($"{elem.knev} {elem.vnev}");
                }
            }
            //5.Feladat Béke nobel díj
            Console.WriteLine("5.Feladat:");
            foreach (var elem in nobelLista)
            {
                if (elem.tipus=="béke" && elem.vnev=="")
                {
                    Console.WriteLine($"\t{elem.ev}: {elem.knev}");
                }
            }
            //6.Feladat
            Console.WriteLine("6.Feladat:");
            foreach (var elem in nobelLista)
            {
                if (elem.vnev.Contains("Curie"))
                {
                    Console.WriteLine($"\t {elem.ev}: {elem.knev} {elem.vnev}({elem.tipus})");
                }
            }
            //7.Feladat
            Dictionary<string, int> dikt = new Dictionary<string, int>();
            foreach (var elem in nobelLista)
            {
                if (dikt.ContainsKey(elem.tipus))
                {
                    dikt[elem.tipus]++;
                }
                else
                {
                    dikt[elem.tipus] = 1;
                }
            }
            Console.WriteLine("7.Feladat:");
            foreach (var elem in dikt)
            {
                Console.WriteLine($"\t {elem.Key} {elem.Value}db");
            }
            //8.Feladat
            Console.WriteLine("8.Feladat:orvosi.txt elkészült");
            List<string> kimenet = new List<string>();
            foreach (var elem in nobelLista)
            {
                if (elem.tipus=="orvosi")
                {
                    kimenet.Add($"{elem.ev}:{elem.knev} {elem.vnev}");
                }
            }
            File.WriteAllLines("orvosi.txt", kimenet);

            Console.ReadKey();
        }
    }
}
