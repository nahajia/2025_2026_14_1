using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using NetworkHelper;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            List<uralkodo> tomb = Backend.GET("http://localhost:3000/uralkodo").Send().As<List<uralkodo>>();
            cbx_ural.ItemsSource = tomb;
            cbx_ural.DisplayMemberPath = "nev";
            cbx_ural.SelectedIndex = 0;
            //uralkodóház
            List<Uralkodohaz> bemenet = Backend.GET("http://localhost:3000/uralkodohaz").Send().As<List<Uralkodohaz>>();
            cbx_uralhaz.ItemsSource = bemenet;
            cbx_uralhaz.DisplayMemberPath = "nev";
            cbx_uralhaz.SelectedIndex = 0;
        }

        private void Cbx_ural_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var kivalasztott = cbx_ural.SelectedItem as uralkodo;
            lb_szul.Content = kivalasztott.szul;
            lb_hal.Content = kivalasztott.hal;

            if(kivalasztott.ragnev == null)
            {
                lb_ragnev.Content = "nincs";
            }
            else
            {
                lb_ragnev.Content = kivalasztott.ragnev;
            }
            

            
        }

        private void Btn_nevKeres_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (tbx_nev.Text == "")
                {
                    MessageBox.Show("Kötelező megadni a keresendő szót!");
                }
                else
                {
                    var bemenet = new
                    {
                        szo = tbx_nev.Text
                    };
                    List<uralkodo> kimenet = Backend.POST("http://localhost:3000/keresUralkodo").Body(bemenet).Send().As<List<uralkodo>>();
                    lbx_nevLista.ItemsSource = kimenet;
                    lbx_nevLista.DisplayMemberPath = "nevSzulHal";
                }
            }
            catch (Exception)
            {

                MessageBox.Show("Hiba!");
            }
            
            
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            var bemenet = new
            {
                nev = tbx_haznev.Text
            };
            string kimenet = Backend.POST("http://localhost:3000/felvitelUralkodoHaz").Body(bemenet).Send().As<string>();

            MessageBox.Show(kimenet);

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            try
            {
                if (tbx_urnev.Text=="" || tbx_szul.Text==""||tbx_hal.Text == "")
            {
                MessageBox.Show("Kötelező megadni az uralkodó nevét, születését, halálát");
            }
            else
            {
                 var bemenet = new
                {
                    nev=tbx_urnev.Text,
                    ragnev=tbx_ragnev.Text,
                    szul=int.Parse(tbx_szul.Text),
                    hal= int.Parse(tbx_hal.Text),
                    uhaz_az=(cbx_uralhaz.SelectedItem as Uralkodohaz).azon
                };
                string kimenet = Backend.POST("http://localhost:3000/felvitelUralkodo").Body(bemenet).Send().As<string>();
                MessageBox.Show(kimenet);
            }
            }
            catch(Exception)
            {
                MessageBox.Show("Hiba!");
            }
            
            
        }

        private void Button_Click_2(object sender, RoutedEventArgs e)
        {
            var bemenet = new
            {
                szo = tbx_haz.Text
            };
            List<uralkodo> kimenet = Backend.POST("http://localhost:3000/keresHazUralkodo").Body(bemenet).Send().As<List<uralkodo>>();

            lbx_hazkeres.ItemsSource = kimenet;
            lbx_hazkeres.DisplayMemberPath = "nevSzulHalHaz";

        }
    }
}
