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
            cb_muvesz.DisplayMemberPath = "az"+"nev";
            cb_muvesz.SelectedIndex = 0;

        }

        private void Cb_muvesz_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var valaszt = cb_muvesz.SelectedItem as Szemely;

            lb_nev.Content = valaszt.nev;
            lb_ev.Content = valaszt.ev;
            lb_elozo.Content = valaszt.elozo;
        }
    }
}
