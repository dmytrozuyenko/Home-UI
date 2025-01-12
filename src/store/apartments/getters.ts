import { GetterTree } from 'vuex';
import { RootStateInterface } from '@/store/types';
import { ApartmentsStateInterface, Getters } from '@/store/apartments/types';

export const getters: GetterTree<ApartmentsStateInterface, RootStateInterface> & Getters = {
  getApartmentsData: (state) => {
    return state.apartments;
  },
  getListOfApartments: (state) => {
    return state.apartments?.map((apartment) => {
      const apartmentData = `кв. ${apartment.apartmentNumber}`;
      const apartmentId = apartment.id;
      return { apartmentData, apartmentId };
    });
  },
};
