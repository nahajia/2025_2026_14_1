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

            List<Szemely> tomb = Backend.GET("http://localhost:3000/szemely").Send().As<List<Szemely>>();
            //MessageBox.Show($"{tomb[0].nev}");
            cb_muvesz.ItemsSource = tomb;
            cb_muvesz.DisplayMemberPath = "azNev";
            cb_muvesz.SelectedIndex = 0;
            //dij kereses
            List<Szemely> dijak = Backend.GET("http://localhost:3000/dijak").Send().As<List<Szemely>>();
            cbx_dijak.ItemsSource = dijak;
            cbx_dijak.DisplayMemberPath = "elozo";
            cbx_dijak.SelectedIndex = 0;
        }

        private void Cb_muvesz_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var valaszt = cb_muvesz.SelectedItem as Szemely;

            lb_nev.Content = valaszt.nev;
            lb_ev.Content = valaszt.ev;
            lb_elozo.Content = valaszt.elozo;
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            if (tbx_szo.Text=="")
            {
                MessageBox.Show("Kötelező megadni a keresendő szót!");
            }
            else
            {
                try
                {
                    string szo = tbx_szo.Text;
                    var bemenet = new
                    {
                        szo = szo
                    };
                    List<Szemely> kimenet = Backend.POST("http://localhost:3000/keresettSzo").Body(bemenet).Send().As<List<Szemely>>();
                    lbx_kimenet.ItemsSource = kimenet;
                    lbx_kimenet.DisplayMemberPath = "nev";
                }
                catch (Exception)
                {
                    MessageBox.Show($"Hiba");
                    
                }
               
            }
            
        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            try
            {
                if (tbx_nev.Text == "")
                {
                    MessageBox.Show("Kötelező nevet megadni!");
                }
                else if (tbx_ev.Text == "")
                {
                    MessageBox.Show("Kötelező évet megadni!");
                }
                else if (!(int.Parse(tbx_ev.Text) <= 2026 && int.Parse(tbx_ev.Text) >= 1900))
                {
                    MessageBox.Show("1900 és 2026 közötti értéket adj meg!");
                }
                else
                {
                    var bemenet = new
                    {
                        nev = tbx_nev.Text,
                        ev = Convert.ToInt16(tbx_ev.Text),
                        elozo = tbx_elozo.Text
                    };
                    string kimenet = Backend.POST("http://localhost:3000/szemelyFelvitel").Body(bemenet).Send().As<string>();
                    MessageBox.Show(kimenet);
                }
            }
            catch (Exception ex)
            {

                MessageBox.Show("Hiba!");
            }

            
            
        }
    }
}
