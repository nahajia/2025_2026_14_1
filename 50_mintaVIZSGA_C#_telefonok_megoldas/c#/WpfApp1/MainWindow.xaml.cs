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
using ConsoleApp1;
using NetworkHelper;

namespace WpfApp1
{
   
    public partial class MainWindow : Window
    {
        List<Telefon> tomb = Backend.GET("http://localhost:3000/telefonok").Send().As<List<Telefon>>();
        public MainWindow()
        {
            InitializeComponent();

            cbx_telefon.ItemsSource = tomb;
            cbx_telefon.SelectedIndex = 0;
            cbx_telefon.DisplayMemberPath = "modell";


            

        }

        private void Cbx_telefon_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var kivalasztott = cbx_telefon.SelectedItem as Telefon;
            tbx_marka.Text = kivalasztott.marka_nev;
            tbx_modell.Text = kivalasztott.modell;
            tbx_ujar.Text = kivalasztott.uj_ar.ToString();
            tbx_hasznaltar.Text = kivalasztott.hasznalt_ar.ToString();
            if (kivalasztott.okostelefon == 1)
            {
                tbx_tipus.Text = "Okostelefon";
            }
            else
            {
                tbx_tipus.Text = "Buta telefon";
            }
            
            tbx_kijelzo.Text = kivalasztott.kijelzo_merete.ToString();
            tbx_leiras.Text = kivalasztott.leiras;


        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
           
                if (tbx_minimum.Text == "" || tbx_maximum.Text == "")
                {
                    MessageBox.Show("A keresőmezők nem lehetnek üresek!");
                    return;
                }
                try
                {
                    var bemenet = new
                    {
                        minimum = int.Parse(tbx_minimum.Text),
                        maximum = int.Parse(tbx_maximum.Text)
                    };
                            try
                            {
                                List<Telefon> kimenet = Backend.POST("http://localhost:3000/telefonUjArKereses").Body(bemenet).Send().As<List<Telefon>>();


                                lbx_kimenet.ItemsSource = kimenet;
                                lbx_kimenet.DisplayMemberPath = "kimenet";
                            }
                            catch (Exception)
                            {

                    MessageBox.Show("hálozati hiba, vagy nincs találat");
                            }

                   
                }
                catch (Exception)
                {

                    MessageBox.Show("Csak számot lehet megadni!");
                    return;
                }
                


            

        }
    }
}
