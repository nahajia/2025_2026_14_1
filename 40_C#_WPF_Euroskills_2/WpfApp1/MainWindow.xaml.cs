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
            List<Szakma> tomb = Backend.GET("http://localhost:3000/szakma").Send().As<List<Szakma>>();
            cbx_szakma.ItemsSource = tomb;
            cbx_szakma.DisplayMemberPath = "szakmaNev";
            //cbx_szakma.SelectedIndex = 0;
            // ország lekérése
            List<Orszag> tomb2 = Backend.GET("http://localhost:3000/orszag").Send().As<List<Orszag>>();
            cbx_orszag.ItemsSource = tomb2;
            cbx_orszag.DisplayMemberPath = "orszagNev";
            // felvitel fül
            cbx_vszakma.ItemsSource = tomb;
            cbx_vszakma.DisplayMemberPath = "szakmaNev";
            cbx_vszakma.SelectedIndex = 0;
            cbx_vorszag.ItemsSource = tomb2;
            cbx_vorszag.DisplayMemberPath = "orszagNev";
            cbx_vorszag.SelectedIndex = 0;
            // 5-ös fül
            tomb.Insert(0, new Szakma{ id = "0", szakmaNev = "---" });
            cbx_szakma5.ItemsSource = tomb;
            cbx_szakma5.DisplayMemberPath = "szakmaNev";
            cbx_szakma5.SelectedIndex = 0;
            tomb2.Insert(0, new Orszag { id = "0", orszagNev = "---" });
            cbx_orszag5.ItemsSource = tomb2;
            cbx_orszag5.DisplayMemberPath = "orszagNev";
            cbx_orszag5.SelectedIndex = 0;

        }

        private void Btn_gomb_Click(object sender, RoutedEventArgs e)
        {

            lb_hiba.Content = "";
            try
            {

            
            string keresendo = tb_keres.Text;
            if (keresendo == "")
            {
                // MessageBox.Show("Add meg a nevet!");
                lb_hiba.Content = "Add meg a nevet";

            }
            else
            {
                var bemenet = new
                            {
                                keresendo = keresendo
                            };
                            List<Versenyzo> kimenet = Backend.POST("http://localhost:3000/keresesNev").Body(bemenet).Send().As<List<Versenyzo>>();
                            lbx_talalatok.ItemsSource = kimenet;
                            lbx_talalatok.DisplayMemberPath = "NevesPont";
            }
            }
            catch
            {
                MessageBox.Show("Hiba!");
            }



        }

        private void Cbx_szakma_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            string szakmaAzon = (cbx_szakma.SelectedItem as Szakma).id;
            var bemenet = new
            {
                azonosito=szakmaAzon
            };
            List<Versenyzo> kimenet = Backend.POST("http://localhost:3000/keresSzakma").Body(bemenet).Send().As<List<Versenyzo>>();
            lbx_szakmaTalalat.ItemsSource = kimenet;
            lbx_szakmaTalalat.DisplayMemberPath = "OrszagNevPont";
        }

        private void Dg_orszagTalalat_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        private void Cbx_orszag_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                string OrszagAzon = (cbx_orszag.SelectedItem as Orszag).id;
                var bemenet = new
                {
                    azonosito = OrszagAzon
                };
                List<Versenyzo> kimenet = Backend.POST("http://localhost:3000/keresOrszag").Body(bemenet).Send().As<List<Versenyzo>>();
                dg_orszagTalalat.ItemsSource = kimenet;
            }
            catch
            {
                MessageBox.Show("Hiba");
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                if (tx_nev.Text == "")
                {
                    MessageBox.Show("Szemény nevének megadása kötelező!");
                }
                else if (tx_pont.Text == "")
                {
                    MessageBox.Show("Pontszám megadása kötelező!");
                }
                else if  (!int.TryParse(tx_pont.Text,out int pont))
                {
                    MessageBox.Show("Számot adj meg a pontnak!");
                    return;
                }
                else
                {

                    var bemenet = new
                    {
                        nev = tx_nev.Text,
                        szakma = (cbx_vszakma.SelectedItem as Szakma).id,
                        orszag = (cbx_vorszag.SelectedItem as Orszag).id,
                        pont = Convert.ToInt32(tx_pont.Text)
                    };
                    string kimenet = Backend.POST("http://localhost:3000/felvitelVersenyzo").Body(bemenet).Send().As<string>();
                    MessageBox.Show(kimenet);

                }
            }
            catch
            {
                MessageBox.Show("Hiba");
            }

        }

        private void Button_Click_1(object sender, RoutedEventArgs e)
        {
            dg_keres5.ItemsSource = null;
            if(cbx_szakma5.SelectedIndex==0 && cbx_orszag5.SelectedIndex == 0)
            {
                MessageBox.Show("Válassza ki a szakmát vagy az országot");
            }
            else
            {
                var bemenet = new
                {
                    szakma = (cbx_szakma5.SelectedItem as Szakma).id,
                    orszag = (cbx_orszag5.SelectedItem as Orszag).id
                };
                List<Versenyzo> kimenet = Backend.POST("http://localhost:3000/keresMindketto").Body(bemenet).Send().As<List<Versenyzo>>();
                dg_keres5.ItemsSource = kimenet;
            }
        }
    }
}
