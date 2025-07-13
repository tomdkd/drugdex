export interface MedLine {
  cis_code: number;
  med_name: string;
  type: string;
  to_use: string[];
  status: string;
  process_type: string;
  shoppable: boolean;
  date_of_shop: string;
  availabity_status: string | null;
  auth_number: string | null;
  owners: string[];
  enforce_warning: boolean;
}
