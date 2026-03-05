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
    }
}
