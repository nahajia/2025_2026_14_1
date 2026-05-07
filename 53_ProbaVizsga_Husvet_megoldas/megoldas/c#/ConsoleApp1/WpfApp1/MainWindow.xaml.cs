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
using ConsoleApp1;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static List<Locsolovers> locsoloversek = new List<Locsolovers>();
        public MainWindow()
        {
            InitializeComponent();
            AdatokBetoltese();
        }

        private void AdatokBetoltese()
        {
            locsoloversek = Backend.GET("http://localhost:3000/locsoloversek").Send().As<List<Locsolovers>>();
            
            cbx_locsoloversek.Items.Clear();
            cbx_locsoloversek.ItemsSource = locsoloversek;
            cbx_locsoloversek.SelectedIndex = 0;
            cbx_locsoloversek.DisplayMemberPath = "cim";


        }

        private void cbx_locsoloversek_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var kivalasztott = cbx_locsoloversek.SelectedItem as Locsolovers;

            lb_stilus.Content = $"[{kivalasztott.stilus_nev}]";
            lb_ev.Content = kivalasztott.keletkezes_ev;
            lb_olvasasido.Content = $"{kivalasztott.olvasasi_ido_perc} perc";
            lb_kedvelesek.Content = kivalasztott.kedvelesek_szama;
            lb_vers.Content = kivalasztott.vers;
        }

        private void btn_kereses_Click(object sender, RoutedEventArgs e)
        {
            if (string.IsNullOrWhiteSpace(tbx_kereses.Text))
            {
                MessageBox.Show("A keresőmező nem lehet üres!");
                return;
            }

            try
            {
                lbx_kereses.Items.Clear();

                var bemenet = new
                {
                    szo = tbx_kereses.Text
                };
                List<Locsolovers> kimenet = Backend.POST("http://localhost:3000/versKereses").Body(bemenet).Send().As<List<Locsolovers>>();

                foreach (var vers in kimenet) lbx_kereses.Items.Add($"[{vers.stilus_nev}] {vers.cim}:{vers.vers}");

            } catch (Exception ex)
            {
                MessageBox.Show("Nincs találat vagy hiba!");
            }



        }
    }
}
