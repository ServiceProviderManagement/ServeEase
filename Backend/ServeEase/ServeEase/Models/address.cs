//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ServeEaseV3.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class address
    {
        public int address_id { get; set; }
        public int user_id { get; set; }
        public string city { get; set; }
        public string district { get; set; }
        public string state { get; set; }
        public string address1 { get; set; }
        public string pin_code { get; set; }
        public string dummy_column1 { get; set; }
        public string dummy_column2 { get; set; }
        public string dummy_column3 { get; set; }
        public string dummy_column4 { get; set; }
        public string dummy_column5 { get; set; }
    
        public virtual user user { get; set; }
    }
}
